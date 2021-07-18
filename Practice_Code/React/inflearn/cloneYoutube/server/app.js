const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// 바디파서 ( req.body )
app.use(express.json()); // application/json분석
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded분석

// 쿠키파서
app.use(cookieParser());

// cors처리
const corsOptions = {
  origin: "http://localhost:8080", // 프론트측의 url  ( process.env.CORS_HOME_SERVER )
  credentials: true, // 설정내용을 res헤더에 추가해줌
};
app.use(cors(corsOptions));

// 몽고디비 연결 ( 몽구스 )
// 몽고디비에 연결만 해주면 데이터베이스, 테이블은 정해준대로 스스로 만들어줌
mongoose
  .connect("mongodb://localhost:27017/clone-youtube", {
    useNewUrlParser: true, // ? 안적으면 에러발생
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고디비 연결 성공 by clone-youtube"))
  .catch(error => console.error("몽고디비 연결 실패 >> ", error));

// 라우터
const authRouter = require("./router/auth");
const userRouter = require("./router/user");

app.use("/auth", authRouter);
app.use("/user", userRouter);

// 임시라우터
app.get("/", (req, res) => {
  res.send("로그인해봐");
});
// 테스트라우터
app.post("/test", (req, res) => {
  res.json({ message: "success test" });
});

app.listen(3000, () => {
  console.log("3000번 대기중");
});
