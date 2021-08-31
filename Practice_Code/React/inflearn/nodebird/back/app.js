const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");
require("dotenv").config();

try {
  fs.accessSync("uploads");
} catch (error) {
  // uploads폴더생성
  fs.mkdirSync("uploads");
}

const app = express();

// cors처리
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  }),
);

// passport
passportConfig();

// 미들웨어장착
app.use(express.json()); // 나머지 처리
app.use(express.urlencoded({ extended: true })); // from데이터 처리
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

// sequelize로 DB연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("mysql연결성공");
  })
  .catch(console.error);

// 라우터장착
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.listen(3000, () => {
  console.log("3000번 대기중");
});
