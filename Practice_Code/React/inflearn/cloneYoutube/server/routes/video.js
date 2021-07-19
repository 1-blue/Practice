const router = require("express").Router();
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

module.exports = router;
