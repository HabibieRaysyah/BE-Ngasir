"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Store, {
        foreignKey: "store_id",
      });
      Product.belongsTo(models.Categorie, {
        foreignKey: "category_id",
      });

      Product.belongsTo(models.Suplier, { 
        foreignKey: "suplier_id"
      }) 

      Product.hasMany(models.Transaction_Item, {
        foreignKey: "product_id",
      });

      Product.hasMany(models.Inventory, {
        foreignKey: "product_id"
      })
    }
  }
  Product.init(
    {
      store_id: DataTypes.BIGINT,
      category_id: DataTypes.BIGINT,
      suplier_id: DataTypes.BIGINT,
      name: DataTypes.STRING,
      img: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("img");
          return rawValue ? `http://localhost:3002/uploads/${rawValue}` : null;
        },
      },
      status : DataTypes.BOOLEAN,
      purchase_price: DataTypes.DECIMAL,
      selling_price: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
      min_stock: DataTypes.INTEGER,
      barcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
