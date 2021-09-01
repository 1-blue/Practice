const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");

// 로그인 유지
router.get("/", async (req, res) => {
  // 로그인중인지 체크
  if (!req.user) return res.json({ user: null });

  // 유저와 유저와 관련된 정보까지 모아서 찾음
  try {
    const fullUser = await User.findOne({
      attributes: ["_id", "nickname", "createdAt"],
      where: { _id: req.user._id },
      include: [
        { model: Post, attributes: ["_id"] },
        { model: User, as: "Followers", attributes: ["_id", "nickname"] },
        { model: User, as: "Followings", attributes: ["_id", "nickname"] },
      ],
    });

    return res.status(200).json({ result: true, user: fullUser });
  } catch (error) {
    console.error("GET /user >> ", error);
    return res.status(500).json({ result: true, error });
  }
});

// 회원가입
router.post("/", isNotLoggedIn, async (req, res) => {
  const { id, password, nickname } = req.body;

  try {
    // 이미 가입된 유저인지 체크
    const exUser = await User.findOne({ where: { id } });
    if (exUser) return res.status(400).json({ result: false, message: "이미 가입된 아이디입니다." });

    // 회원가입성공 ( 유저정보기록 )
    const hashedPassword = await bcrypt.hash(password, 6);
    await User.create({
      id,
      password: hashedPassword,
      nickname,
    });
    return res.status(200).json({ result: true, message: "회원가입이 완료되었습니다. 메인페이지로 이동합니다" });
  } catch (error) {
    console.error("POST /user >> ", error);
    return res.status(500).json({ result: false, message: "회원가입측 서버오류", error });
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, reason) => {
    // 서버측 에러 ( 조건검사 도중에 에러 )
    if (error) {
      console.error("POST /user/login >> ", error);
      return res.status(500).json({ result: false, message: "로그인 서버측 에러", error });
    }

    // 클라이언트측 에러 ( 아이디 or 비밀번호 불일치 )
    if (reason) {
      return res.status(400).json({ result: false, message: reason });
    }
    return req.login(user, async loginError => {
      if (loginError) {
        console.error("POST /user/login loginError >> ", loginError);
        return res.status(500).json({ result: false, message: loginError });
      }

      // 유저와 유저와 관련된 정보까지 모아서 찾음
      const fullUser = await User.findOne({
        attributes: ["_id", "nickname", "createdAt"],
        where: { _id: user._id },
        include: [
          { model: Post },
          { model: User, as: "Followers", attributes: ["_id", "nickname"] },
          { model: User, as: "Followings", attributes: ["_id", "nickname"] },
        ],
      });
      return res.status(200).json({ result: true, message: "로그인에 성공했습니다.", user: fullUser });
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ result: true, message: "로그아웃에 성공했습니다." });
});

// 닉네임 변경
router.patch("/nickname/:nickname", isLoggedIn, async (req, res) => {
  const { nickname } = req.params;

  try {
    const me = await User.findOne({ where: { _id: req.user._id } });
    const prevNickname = me.nickname;
    await me.update({ nickname });
    res.json({ result: true, nickname, message: `닉네임을 "${prevNickname}"에서 "${nickname}"으로 변경했습니다.` });
  } catch (error) {
    res.status(500).json({ result: false, error, message: "닉네임 변경 서버측 에러" });
  }
});

// 팔로워 추가
router.patch("/follow/:UserId", isLoggedIn, async (req, res) => {
  const { UserId } = req.params;

  try {
    const me = await User.findOne({ where: { _id: req.user._id } });
    await me.addFollowings(UserId);
    const followUser = await User.findOne({ where: { _id: UserId }, attributes: ["nickname"] });
    res.json({ result: true, FollowingId: +UserId, message: `${followUser.nickname}님을 팔로우합니다.` });
  } catch (error) {
    res.status(500).json({ result: false, message: "팔로우 서버측 에러", error });
  }
});

// 팔로워 삭제
router.delete("/follow/:UserId", isLoggedIn, async (req, res) => {
  const { UserId } = req.params;

  try {
    const me = await User.findOne({ where: { _id: req.user._id } });
    await me.removeFollowings(UserId);
    const unfollowUser = await User.findOne({ where: { _id: UserId }, attributes: ["nickname"] });
    res.json({ result: true, FollowingId: +UserId, message: `${unfollowUser.nickname}님의 팔로우를 끊습니다.` });
  } catch (error) {
    res.status(500).json({ result: false, message: "언팔로우 서버측 에러", error });
  }
});

module.exports = router;
