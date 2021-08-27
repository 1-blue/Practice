const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const user = await User.findOne({ where: { id } });

          // 아이디 불일치
          if (!user) return done(null, false, "존재하지 않는 아이디입니다.");

          // 비밀번호 일치여부 확인
          const result = await bcrypt.compare(password, user.password);

          // 비밀번호 불일치
          if (!result) return done(null, false, "비밀번호가 틀렸습니다.");

          // 조건에 해당하는 유저 존재
          return done(null, user);
        } catch (error) {
          // 서버측 에러
          console.error("login local >> ", error);
          return done(error);
        }
      },
    ),
  );
};
