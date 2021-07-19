const router = require("express").Router();

// 미들웨어
const { auth } = require("../middleware/auth");

// 데이터베이스 모델
const User = require("../models/User");

// 회원가입
router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((error, doc) => {
    if (error) {
      return res.json({ result: false, message: "회원가입 실패", error });
    }

    return res.json({ result: true, message: "회원가입 성공! 로그인페이지로 이동합니다.", doc });
  });
});

// 로그인 ( 이메일과 비밀번호이용 )
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = null;

  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.json({ result: false, message: "이메일에 해당하는 유저가 없습니다." });
    }
  } catch (error) {
    return res.json({ result: false, message: "이메일에 해당하는 유저가 없습니다.", error });
  }

  // 비밀번호 비교
  user.comparePassword(password, (error, isMatch) => {
    // 비밀번호 불일치
    if (!isMatch) return res.status(400).json({ result: false, message: "비밀번호 불일치" });

    // 토큰생성
    user.generateToken((err, newUser) => {
      // 토큰생성 실패
      if (err) return res.status(400).json({ result: false, message: "토큰 생성 실패", error: err });

      // 쿠키에 토큰저장 및 로그인성공
      res
        .cookie("x_auth", newUser.token)
        .status(200)
        .json({ result: true, message: "로그인 성공! 메인페이지로 이동합니다.", userId: newUser._id });
    });
  });
});

// 로그아웃
router.get("/logout", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOneAndUpdate({ _id }, { token: "" });
    res.json({ result: true, message: "로그아웃 성공! 로그인페이지로 이동합니다.", user });
  } catch (error) {
    res.json({ result: false, message: "로그아웃 실패!", error });
  }
});

module.exports = router;
