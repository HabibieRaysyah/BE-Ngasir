"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.hasMany(models.Transaction_Item, {
        foreignKey: "transaction_id",
      });

      Transaction.belongsTo(models.Store, {
        foreignKey: "store_id",
      });

      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Transaction.init(
    {
      store_id: DataTypes.BIGINT,
      user_id: DataTypes.BIGINT,
      code_transaction: DataTypes.STRING,
      total_price: DataTypes.DECIMAL,
      paid_amount: DataTypes.DECIMAL,
      method: DataTypes.ENUM(["cash", "qris", "e-wallet"]),
      change_amount: DataTypes.DECIMAL,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
