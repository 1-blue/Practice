const router = require("express").Router();
const ffmpeg = require("fluent-ffmpeg");
const { videoUpload } = require("../multer");
const Video = require("../models/Video");

// 영상만 저장
router.put("/", videoUpload.single("video"), async (req, res) => {
  const videoName = req.file.filename;

  // // 이미지 저장 실패
  if (!videoName) {
    return res.status(503).json({ result: false, message: "Failed to save video" });
  }

  // 이미지 저장 성공시 이미지 저장해둔 path전송
  res.status(200).json({ result: true, message: "success", videoName });
});

// 영상이름과 영상에 대한 추가정보 저장
router.post("/", async (req, res) => {
  const video = new Video(req.body);

  video.save((error, doc) => {
    if (error) {
      return res.json({ result: false, message: "영상저장 실패", error });
    }

    return res.json({ result: true, message: "영상저장 성공! 메인페이지로 이동합니다.", doc });
  });
});

// 썸네일 생성
router.post("/thumbnail", async (req, res) => {
  // 비디오 경로
  const videoPath = `uploads/videos/${req.body.videoName}`;

  let thumbnailName = "";
  let videoDuration = "";

  // 비디오 플레이타임기록
  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    // metadata에 영상에 대한 많은 정보들이 들어있음
    videoDuration = metadata.format.duration;
    videoDuration = Math.round(videoDuration * 10) / 10;
  });

  // 썸네일 생성
  ffmpeg(videoPath)
    .on("filenames", filenames => {
      // 썸네일 이름 저장 ( 기존 비디오명과 같고 확장자만 다름 )
      thumbnailName = filenames[0];
    })
    .on("end", () =>
      res.json({
        success: true,
        thumbnailName,
        videoDuration,
      }),
    )
    .on("error", err => {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x200",
      // %b input basename ( filename w/o extension )
      filename: "%b.png",
    });
});

// 특정 영상정보 가져오기
router.get("/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const response = await Video.findOne({ _id: videoId }).populate("writer").exec();

  res.send(response);
});

// 모든 영상 정보 가져오기
router.get("/", async (req, res) => {
  res.send(await Video.find().populate("writer").exec());
});

module.exports = router;
