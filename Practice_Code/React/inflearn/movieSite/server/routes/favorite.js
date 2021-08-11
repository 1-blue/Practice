const router = require("express").Router();

// 데이터베이스 모델
const Favorite = require("../models/Favorite");

// 내가 좋아요 눌렀는지 확인
router.post("/check", async (req, res) => {
  const { userId, movieId } = req.body;

  // 이미 좋아요 눌렀는지 확인
  const check = await Favorite.findOne({ userId, movieId });

  // 누르지않았다면
  if (!check) {
    return res.send(false);
  }

  // 눌렀다면
  return res.send(true);
});

// 영화 좋아요 클릭
router.post("/", async (req, res) => {
  const { userId, movieId, movieTitle, movieRuntime, movieUrl } = req.body;

  // 이미 좋아요 눌렀는지 확인
  const check = await Favorite.findOne({ userId, movieId });

  // 없으면 생성
  if (!check) {
    await Favorite.create({ userId, movieId, movieTitle, movieRuntime, movieUrl });
    return res.json({ result: true, message: "좋아요생성 완료" });
  }

  // 있으면 삭제
  await Favorite.findOneAndDelete({ userId, movieId });
  return res.json({ result: true, message: "좋아요삭제 완료" });
});

// 영화의 좋아요 개수
router.get("/count/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const temp = await Favorite.find({ movieId });

  res.send(String(temp.length));
});

// 현재 유저가 좋아요 누른 영화들
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const temp = await Favorite.find({ userId });

  res.send(temp);
});

// 좋아요 삭제
router.delete("/", async (req, res) => {
  const { userId, movieId } = req.body;

  await Favorite.findOneAndDelete({ userId, movieId });

  return res.json({ result: true, message: "좋아요삭제 완료" });
});

module.exports = router;
