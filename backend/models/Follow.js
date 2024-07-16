const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Follow = sequelize.define(
  "Follow",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
      unique: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Follow;
