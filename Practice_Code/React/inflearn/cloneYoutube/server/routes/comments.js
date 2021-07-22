const router = require("express").Router();

// 데이터베이스 모델
const Comments = require("../models/Comments");

// 댓글생성
router.post("/", async (req, res) => {
  const { videoId, userId, commentsId, contents } = req.body;

  const comments = new Comments({ videoId, userId, commentsId, contents });

  comments.save((error, response) => {
    if (error) return res.json({ result: false, error });

    return res.json({ result: true, response });
  });
});

// 해당 영상의 댓글 모두 가져오기
router.get("/:videoId", async (req, res) => {
  const { videoId } = req.params;

  const commentsList = await Comments.find({ videoId }).populate("userId").exec();

  return res.send(commentsList);
});

module.exports = router;
