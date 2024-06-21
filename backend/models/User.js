const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // sequelizeインスタンスのパスを適宜修正してください

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.STRING), // 例として
      defaultValue: [],
    },
    followings: {
      type: DataTypes.ARRAY(DataTypes.STRING), // 例として
      defaultValue: [],
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    desc: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
