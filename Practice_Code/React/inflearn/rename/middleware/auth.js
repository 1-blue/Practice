const User = require("../models/User");

const auth = (req, res, next) => {
  // 클라이언트의 쿠키에서 토큰을 가져옴
  const token = req.cookies.x_auth;

  // 토큰 복호화해서 유저의 아이디를 얻음
  User.findByToken(token, (error, user) => {
    console.log(user);
    if (error) throw error;
    if (!user) return res.status(400).json({ message: "유저가 존재하지 않음" });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
