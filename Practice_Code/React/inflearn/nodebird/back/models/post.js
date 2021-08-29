module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "포스트의 아이디 ( 포스트를 식별할 값 )",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  Post.associate = db => {
    // 유저와 게시글 ( 1 : N )
    db.Post.belongsTo(db.User);

    // 게시글과 댓글 ( 1 : N )
    db.Post.hasMany(db.Comment);

    // 게시글과 해시태그 ( N : M )
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });

    // 유저와 게시글 좋아요 ( N : M )
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });

    // 게시글과 이미지 ( 1 : N )
    db.Post.hasMany(db.Image);

    // 리트윗
    db.Post.belongsTo(db.Post, { as: "RetweetId" });
  };

  return Post;
};
