const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

// 회원가입
router.post("/", async (req, res) => {
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
    console.log("POST /user error >> ", error);
    return res.status(500).json({ result: false, message: error });
  }
});

module.exports = router;
