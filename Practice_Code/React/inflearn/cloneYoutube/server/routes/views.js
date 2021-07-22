const router = require("express").Router();

// 데이터베이스 모델
const Views = require("../models/Views");

// 조회수찾기
router.get("/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const views = await Views.findOne({ videoId });

  res.send(String(views.views));
});

// 조회수 생성
router.post("/", async (req, res) => {
  const { videoId } = req.body;

  const views = new Views({ videoId });

  views.save((error, doc) => {
    if (error) {
      return res.json({ result: false, message: "조회수 생성 실패", error });
    }

    return res.json({ result: true, message: "조회수 생성 성공", doc });
  });
});

// 조회수++
router.put("/", async (req, res) => {
  const { videoId } = req.body;

  // 조회수 찾고
  const views = await Views.findOne({ videoId }).exec();

  // +1
  await Views.findOneAndUpdate({ videoId }, { views: views.views + 1 });

  res.send("success");
});

module.exports = router;
