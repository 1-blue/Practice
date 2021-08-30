const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");

// 로그인 유지
router.get("/", async (req, res) => {
  if (!req.user) return res.send({ user: null });

  // 유저와 유저와 관련된 정보까지 모아서 찾음
  try {
    const fullUser = await User.findOne({
      attributes: ["_id", "nickname", "createdAt"],
      where: { _id: req.user._id },
      include: [
        { model: Post, attributes: ["_id"] },
        { model: User, as: "Followers", attributes: ["_id"] },
        { model: User, as: "Followings", attributes: ["_id"] },
      ],
    });

    return res.status(200).json({ result: true, user: fullUser });
  } catch (error) {
    console.error("GET /user error >> ", error);
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
    console.error("POST /user error >> ", error);
    return res.status(500).json({ result: false, message: error });
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, reason) => {
    // 서버측 에러 ( 조건검사 도중에 에러 )
    if (error) {
      console.error("POST /user/login >> ", error);
      return res.status(500).json({ result: false, message: error });
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
        include: [{ model: Post }, { model: User, as: "Followers" }, { model: User, as: "Followings" }],
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

router.patch("/nickname/:nickname", isLoggedIn, async (req, res) => {
  const { nickname } = req.params;

  try {
    const me = await User.findOne({ where: { _id: req.user._id } });
    await me.update({ nickname });
    res.json({ result: true, nickname });
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
