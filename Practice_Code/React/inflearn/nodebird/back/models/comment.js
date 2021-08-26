module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "댓글의 아이디 ( 댓글를 식별할 값 )",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestemps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  });

  Comment.associate = db => {
    // 유저와 댓글 ( 1 : N )
    db.Comment.belongsTo(db.User);

    // 게시글과 댓글 ( 1 : N )
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
}