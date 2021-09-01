const router = require("express").Router();
const { Op } = require("sequelize");
const path = require("path");
const multer = require("multer");
const { isLoggedIn } = require("../middleware");
const { Post, User, Comment, Image } = require("../models");

// multer
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// 게시글 로드
router.get("/", async (req, res) => {
  const { lastId } = req.query;
  const where = {};

  if (+lastId) {
    where._id = { [Op.lt]: +lastId };
  }

  try {
    const post = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
        { model: Image },
        { model: User, as: "Likers", attributes: ["_id"] },
        { model: Post, as: "Retweet", include: [{ model: User, attributes: ["_id", "nickname"] }, { model: Image }] },
      ],
    });
    return res.json({ result: true, post });
  } catch (error) {
    console.error(error);
    return res.json({ result: false, error });
  }
});

// 게시글 삭제
router.delete("/:PostId", isLoggedIn, async (req, res) => {
  const { PostId } = req.params;

  try {
    await Post.destroy({ where: { _id: PostId } });
  } catch (error) {
    res.json({ result: false, error });
  }

  res.json({ PostId: +PostId });
});

// 게시글 업로드
router.post("/", isLoggedIn, async (req, res) => {
  const { content, userId: UserId, imagePaths } = req.body;

  // 작성자와 로그인유저 같은지 이중체크
  if (req.user._id !== UserId) return res.status(403).json({ result: false, message: "접근권한이 없습니다." });

  // 게시글생성
  const post = await Post.create({
    content,
    UserId,
  });

  // 게시글에 추가한 이미지들 생성
  for (let imagePath of imagePaths) {
    await Image.create({
      src: imagePath,
      PostId: post._id,
    });
  }

  const fullPost = await Post.findOne({
    where: { _id: post._id },
    order: [
      ["createdAt", "DESC"],
      [Comment, "createdAt", "DESC"],
    ],
    include: [
      { model: User },
      { model: Comment },
      { model: Image },
      { model: User, as: "Likers", attributes: ["_id"] },
    ],
  });

  res.json({ result: true, post: fullPost });
});

// 게시글에 댓글 업로드
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

// 게시글에 좋아요 추가
router.patch("/like/:_id", isLoggedIn, async (req, res) => {
  const { _id } = req.params;

  try {
    const post = await Post.findOne({ where: { _id } });
    await post.addLikers(req.user._id);

    res.json({ result: true, UserId: req.user._id, PostId: +_id });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error });
  }
});

// 게시글에 좋아요 삭제
router.delete("/like/:_id", isLoggedIn, async (req, res) => {
  const { _id } = req.params;

  try {
    const post = await Post.findOne({ where: { _id } });
    await post.removeLikers(req.user._id);

    res.json({ result: true, UserId: req.user._id, PostId: +_id });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error });
  }
});

// 이미지 업로드
router.post("/images", isLoggedIn, upload.array("image"), async (req, res) => {
  res.json({ result: true, imagePaths: req.files.map(file => file.filename) });
});

// 리트윗
router.post("/reteew", isLoggedIn, async (req, res) => {
  const { PostId } = req.body;

  try {
    const post = await Post.findOne({
      where: { _id: PostId },
      include: [
        { model: Post, as: "Retweet" },
        { model: User, attributes: ["nickname"] },
      ],
    });

    // 게시글 존재 체크
    if (!post) return res.status(400).json({ result: false, message: "존재하지 않는 게시글입니다." });

    // 자신의 게시글인지 체크
    if (post.UserId === req.user._id || (post.Retweet && post.Retweet.UserId === req.user._id))
      return res.status(400).json({ result: false, message: "자기의 게시글은 리트윗할 수 없습니다." });

    const retweetTargetId = post.RetweetId || post._id;

    // 이미 리트윗했는지
    const exPost = await Post.findOne({
      where: {
        UserId: req.user._id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) return res.status(400).json({ result: false, message: "이미 리트윗한 게시글입니다." });

    const retweetPost = await Post.create({
      content: `retweet한 ${post.User.nickname}님의 게시글이 삭제되었습니다.`,
      UserId: req.user._id,
      RetweetId: retweetTargetId,
    });

    const retweetPostWithPost = await Post.findOne({
      where: { _id: retweetPost._id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [{ model: User, attributes: ["_id", "nickname"] }, { model: Image }],
        },
        {
          model: User,
          attributes: ["_id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["_id", "nickname"] }],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["_id"],
        },
      ],
    });

    return res.json({ result: false, retweetPost: retweetPostWithPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, error });
  }
});

module.exports = router;
