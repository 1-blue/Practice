const router = require("express").Router();
const { isLoggedIn } = require("../middleware");
const { Post, User, Comment, Image } = require("../models");

// 게시글 로드
router.get("/:page", async (req, res) => {
  const { page } = req.params;

  const post = await Post.findAll({
    order: [
      ["createdAt", "DESC"],
      [Comment, "createdAt", "DESC"],
    ],
    include: [{ model: User }, { model: Comment, include: [{ model: User }] }, { model: Image }],
  });

  res.json({ result: true, post });
});

// 게시글 업로드
router.post("/", isLoggedIn, async (req, res) => {
  const { content, userId: UserId } = req.body;

  // 작성자와 로그인유저 같은지 이중체크
  if (req.user._id !== UserId) return res.status(403).json({ result: false, message: "접근권한이 없습니다." });

  // 게시글생성
  const post = await Post.create({
    content,
    UserId,
  });

  const fullPost = await Post.findOne({
    where: { _id: post._id },
    include: [{ model: User }, { model: Comment }, { model: Image }],
  });

  res.json({ result: true, post: fullPost });
});

router.post("/comment", isLoggedIn, async (req, res) => {
  const { userId: UserId, postId: PostId, content } = req.body;

  const comment = await Comment.create({
    UserId,
    PostId,
    content,
  });

  const fullComment = await Comment.findOne({
    where: { _id: comment._id },
    include: [{ model: User, attributes: ["_id", "nickname"] }],
  });

  res.send({ result: true, comment: fullComment });
});

module.exports = router;
