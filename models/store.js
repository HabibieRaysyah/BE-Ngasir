"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Product, {
        foreignKey: "store_id",
      });
      Store.hasMany(models.Categorie, {
        foreignKey: "store_id",
      });
      Store.hasOne(models.StoreUser, {
        foreignKey: "store_id",
      });
      Store.hasMany(models.Transaction, {
        foreignKey: "store_id",
      });

      Store.hasMany(models.Suplier, {
        foreignKey: "store_id",
      });

      Store.hasMany(models.Inventory, {
        foreignKey: "store_id",
      });

      Store.hasMany(models.Transaction_Item, {
        foreignKey: "store_id",
      });

      Store.belongsTo(models.User, {
        foreignKey: "owner_id",
      });
    }
  }
  Store.init(
    {
      name: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("image");
          return rawValue ? `http://localhost:3002/uploads/${rawValue}` : null;
        },
      },
      code_store: DataTypes.STRING,
      type: DataTypes.ENUM("coffee_shop", "retail"),
      owner_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Store",
    },
  );
  return Store;
};
