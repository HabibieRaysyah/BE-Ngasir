"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      (Inventory.belongsTo(models.Product, {
        foreignKey: "product_id",
      }),
        Inventory.belongsTo(models.User, {
          foreignKey: "user_id",
        }),
        Inventory.belongsTo(models.Store, {
          foreignKey: "store_id",
        }));
    }
  }
  Inventory.init(
    {
      store_id: DataTypes.BIGINT,
      product_id: DataTypes.BIGINT,
      type: { type: DataTypes.ENUM(["In", "Sale"]) },
      difference: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      user_id: DataTypes.BIGINT,
      referensi: DataTypes.STRING,
      notes: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Inventory",
    },
  );
  return Inventory;
};
