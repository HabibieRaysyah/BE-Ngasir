"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suplier.belongsTo(models.Store, {
        foreignKey: "store_id",
      });

      Suplier.hasMany(models.Product, {
        foreignKey: "suplier_id"
      })
    }
  }
  Suplier.init(
    {
      store_id: DataTypes.BIGINT,
      name: DataTypes.STRING,
      contact: DataTypes.STRING,
      phone: DataTypes.BIGINT,
      status: DataTypes.ENUM(["Aktif", "Non-Aktif"]),
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suplier",
    },
  );
  return Suplier;
};
