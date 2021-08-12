const router = require("express").Router();

// 데이터베이스 모델
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

// 좋아요 클릭
router.post("/like", async (req, res) => {
  const { videoId, userId, commentsId } = req.body;

  // 이미 좋아요를 눌렀다면 삭제
  if (await Like.findOne({ videoId, userId, commentsId }).exec()) {
    await Like.findOneAndDelete({ videoId, userId, commentsId }).exec();
    return res.json({ result: true });
  }

  // 좋아요를 누르지않았다면 생성
  const like = new Like({ videoId, userId, commentsId });
  like.save(async (error, response) => {
    if (error) return res.json({ result: false, error });

    // 싫어요가 눌러져있다면 삭제
    if (await Dislike.findOne({ videoId, userId, commentsId }).exec()) {
      await Dislike.findOneAndDelete({ videoId, userId, commentsId }).exec();
    }

    return res.json({ result: true, response });
  });
});

// 싫어요 클릭
router.post("/dislike", async (req, res) => {
  const { videoId, userId, commentsId } = req.body;

  // 이미 싫어요를 눌렀다면 삭제
  if (await Dislike.findOne({ videoId, userId, commentsId }).exec()) {
    await Dislike.findOneAndDelete({ videoId, userId, commentsId }).exec();
    return res.json({ result: true });
  }

  // 싫어요를 누르지않았다면 생성
  const dislike = new Dislike({ videoId, userId, commentsId });
  dislike.save(async (error, response) => {
    if (error) return res.json({ result: false, error });

    // 좋아요가 눌러져있다면 삭제
    if (await Like.findOne({ videoId, userId, commentsId }).exec()) {
      await Like.findOneAndDelete({ videoId, userId, commentsId }).exec();
    }

    return res.json({ result: true, response });
  });
});

// 해당 영상의 좋아요 개수
router.get("/video/like/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const likeList = await Like.find({ videoId }).exec();

  return res.send(String(likeList.length));
});

// 해당 영상의 싫어요 개수
router.get("/video/dislike/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const dislikeList = await Dislike.find({ videoId }).exec();

  return res.send(String(dislikeList.length));
});

// 해당 댓글의 좋아요 개수
router.get("/comments/like/:commentsId", async (req, res) => {
  const { commentsId } = req.params;

  const likeList = await Like.find({ commentsId }).exec();

  return res.send(String(likeList.length));
});

// 해당 댓글의 싫어요 개수
router.get("/comments/dislike/:commentsId", async (req, res) => {
  const { commentsId } = req.params;

  const dislikeList = await Dislike.find({ commentsId }).exec();

  return res.send(String(dislikeList.length));
});

module.exports = router;
