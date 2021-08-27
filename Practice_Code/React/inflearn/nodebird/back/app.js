const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// cors처리 req.
app.use(
  cors({
    origin: "*",
    credentials: false,
  }),
);

// 바디파서장착
app.use(express.json()); // 나머지 처리
app.use(express.urlencoded({ extended: true })); // from데이터 처리

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
