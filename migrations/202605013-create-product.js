"use strict";

const { type } = require("node:os");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      store_id: {
        type: Sequelize.BIGINT,
      },
      category_id: {
        type: Sequelize.BIGINT,
      },
      suplier_id: {
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      purchase_price: {
        type: Sequelize.DECIMAL,
      },
      selling_price: {
        type: Sequelize.DECIMAL,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      min_stock: {
        type: Sequelize.INTEGER,
      },
      barcode: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Products", {
      fields: ["store_id"],
      type: "foreign key",
      name: "fk_products_store_id",
      references: {
        table: "Stores",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Products", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk_products_category_id",
      references: {
        table: "Categories",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Products", {
      fields: ["suplier_id"],
      type: "foreign key",
      name: "fk_products_suplier_id",
      references: {
        table: "Supliers",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
