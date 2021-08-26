const express = require("express");
const { sequelize } = require("./models");

const app = express();

// sequelize로 DB연결
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("mysql연결성공");
  })
  .catch(console.error);

// 라우터
app.use("/post", require("./routes/post"));

app.listen();
