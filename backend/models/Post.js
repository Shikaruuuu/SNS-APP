const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Post = sequelize.define(
  "Post",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 200],
      },
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Post;
