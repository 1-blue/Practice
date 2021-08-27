exports.isLoggedIn = (req, res, next) => {
  // if (req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.status(401).json({ result: false, message: "로그인후에 접근이 가능합니다." });
  // }
  next();
};

exports.isNotLoggedIn = (req, res, next) => {
  // if (!req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.status(401).json({ result: false, message: "로그아웃후에 접근이 가능합니다." });
  // }
  next();
};
