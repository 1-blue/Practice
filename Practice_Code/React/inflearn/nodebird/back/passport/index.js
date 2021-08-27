const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

module.exports = () => {
  // req.login()실행시 실행됨
  passport.serializeUser((user, done) => {
    // 서버측에서 세션에 저장할 유저의 정보
    // 나중에 DB에서 데이터를 읽는 용도로 사용
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findOne({ where: { _id } });
      done(null, user);
    } catch (error) {
      console.error("deserializeUser error >> ", error);
      done(error);
    }
  });

  local();
};
