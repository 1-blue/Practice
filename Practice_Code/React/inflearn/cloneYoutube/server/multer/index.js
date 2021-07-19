const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 폴더 생성
const makeFolder = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
const multerConfig = () => {
  makeFolder("./uploads");
  makeFolder("./uploads/video");
};

// video multer설정
const videoUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 파일을 저장할공간 지정
      cb(null, "uploads/video/");
    },
    filename(req, file, cb) {
      // 저장할 파일명 결정 ( 파일명_현재시간.확장자 )
      cb(null, `${file.originalname.split(".")[0]}_${new Date().valueOf()}${path.extname(file.originalname)}`);
    },
  }),
});

module.exports = {
  multerConfig,
  videoUpload,
};
