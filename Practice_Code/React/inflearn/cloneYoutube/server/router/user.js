const router = require("express").Router();

// 미들웨어
const { auth } = require("../middleware/auth");

// 로그인시 유저정보 전송해줌
router.get("/", auth, (req, res) => {
  const { _id, role, name, email, password, lastname, image, token, tokenExp } = req.user;

  res.json({
    _id,
    isAdmin: !role,
    name,
    email,
    password,
    lastname,
    image,
    token,
    tokenExp,
  });
});

module.exports = router;
