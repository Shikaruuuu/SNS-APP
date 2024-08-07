const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Post = require("./Post")(sequelize, Sequelize.DataTypes);
const Follow = require("./Follow")(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Post,
  Follow,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize,
  Sequelize,
};
