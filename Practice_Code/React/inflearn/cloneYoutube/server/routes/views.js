const router = require("express").Router();

// 데이터베이스 모델
const Video = require("../models/Video");

// 조회수++
router.post("/", async (req, res) => {
  const { videoId } = req.body;

  // 비디오 찾고
  const video = await Video.findById(videoId).exec();

  // +1
  await Video.findByIdAndUpdate(videoId, { views: video.views + 1 });

  res.send("success");
});

module.exports = router;
