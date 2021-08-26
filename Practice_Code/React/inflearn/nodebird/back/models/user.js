module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "유저의 아이디 ( 유저를 식별할 값 )",
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize, // 요거안넣으면 오류남
    timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
    paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
    underscored: false, // 대문자 _  뭘로구분할지지정
    modelName: "User", // sequelize에서 사용할 모델명
    tableName: "users", // 실제 DB에서 사용할 테이블명
    charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
    collate: "utf8_general_ci", // charset과 같은의미인것같은데
  });

  User.associate = db => {
    // 유저와 게시글 ( 1 : N )
    db.User.hasMany(db.Post);

    // 유저와 댓글 ( 1 : N )
    db.User.hasMany(db.Comment);

    // 유저와 게시글 좋아요 ( N : M )
    db.User.belongsToMany(db.Post, { through: "Like", as: "Likers" });

    // 팔로잉, 팔로워 ( N : M )
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "FollowingId" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "FollowerId" });
  };

  return User;
}