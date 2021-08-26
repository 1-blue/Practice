module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define("Hashtag", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "해시태그의 아이디 ( 해시태그를 식별할 값 )",
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    timestemps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  });

  Hashtag.associate = db => {
    // 게시글과 해시태그 ( N : M )
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" })
  };

  return Hashtag;
}