"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Store, {
        foreignKey: "owner_id",
      });
      User.hasMany(models.StoreUser, {
        foreignKey: "user_id",
      });
      User.hasOne(models.Transaction, {
        foreignKey: "user_id",
      });
      User.hasOne(models.Inventory, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
