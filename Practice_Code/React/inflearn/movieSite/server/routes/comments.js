const router = require("express").Router();

// 데이터베이스 모델
const Comments = require("../models/Comments");

// 댓글생성
router.post("/", async (req, res) => {
  const { movieId, userId, commentsId, contents } = req.body;

  const comments = new Comments({ movieId, userId, commentsId, contents });

  comments.save((error, response) => {
    if (error) return res.json({ result: false, error });

    return res.json({ result: true, response });
  });
});

// 해당 영상의 댓글 모두 가져오기
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const commentsList = await Comments.find({ movieId }).populate("userId").exec();

  return res.send(commentsList);
});

module.exports = router;
