const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLangth: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 4,
  },
  lastname: {
    type: String,
    maxLangth: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: String,
  tokenExp: Number,
});

// 유저모델에 유저정보를 저장하기 전에 실행
userSchema.pre("save", function (next) {
  // 비밀번호 생성시에만 실행
  if (!this.isModified("password")) return next();

  // 패스워드, 반복수, 결과콜백함수
  bcrypt.hash(this.password, 6, (error, hash) => {
    if (error) {
      next(error);
      return;
    }

    this.password = hash;
    next();
  });
});

// 유저 패스워드 비교 메서드 만들기 ( 입력받은 패스워드, 다음실행함수: 앞에서 넘겨준 함수 )
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 패스워드비교
  bcrypt.compare(plainPassword, this.password, (error, isMatch) => {
    // 불일치
    if (error) {
      return cb(error);
    }

    // 일치
    cb(null, isMatch);
  });
};

// 유저로그인시 토큰 생성
userSchema.methods.generateToken = function (cb) {
  // jwt생성
  const token = jwt.sign(this._id.toHexString(), "nodejs");

  // user.token에 생성한 토큰값 넣기
  this.token = token;

  // 유저 데이터베이스에 업데이트
  this.save((error, user) => {
    if (error) return cb(error);

    return cb(null, user);
  });
};

// 유저 토큰 가져오기
userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  // 쿠키로 부터 받은 토큰을 디코딩함
  jwt.verify(token, "nodejs", async (error, decoed) => {
    try {
      // 디코딩한값 (유저의 아이디)를 이용해서 유저를 찾고 유저의 토큰과 쿠키로 부터 받은 토큰이 일치하는지 확인
      const findUser = await user.findOne({ _id: decoed, token });

      // 일치시 찾은 유저 반환
      cb(null, findUser);
    } catch (err) {
      // 불일치시 에러반환
      cb(error);
    }
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
