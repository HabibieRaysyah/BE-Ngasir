"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction_Item.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
      });
      Transaction_Item.belongsTo(models.Store, {
        foreignKey: "store_id",
      });
      Transaction_Item.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }

  Transaction_Item.init(
    {
      store_id: DataTypes.BIGINT,
      transaction_id: DataTypes.STRING,
      product_id: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      subtotal: DataTypes.DECIMAL,
      date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Transaction_Item",
    },
  );
  return Transaction_Item;
};
