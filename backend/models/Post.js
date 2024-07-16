const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
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

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Post;
};
