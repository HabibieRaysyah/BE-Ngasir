"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoreUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StoreUser.belongsTo(models.Store, {
        foreignKey: "store_id",
      });
      StoreUser.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  StoreUser.init(
    {
      store_id: DataTypes.BIGINT,
      user_id: DataTypes.BIGINT,
      role: DataTypes.ENUM("owner","manager","cashier"),
    },
    {
      sequelize,
      modelName: "StoreUser",
    },
  );
  return StoreUser;
};
