module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "이미지의 아이디 ( 이미지를 식별할 값 )",
      },
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestemps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  Image.associate = db => {};

  return Image;
};
