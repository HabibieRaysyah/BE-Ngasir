"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Inventories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      store_id :{
        type: Sequelize.BIGINT
      },
      product_id: {
        type: Sequelize.BIGINT,
      },
      type: {
        type: Sequelize.ENUM(["In", "Sale"]),
      },
      difference: {
        type: Sequelize.INTEGER,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.BIGINT,
      },
      referensi: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.addConstraint("Inventories", {
      fields: ["product_id"],
      type: "foreign key",
      name: "fk_inventories_product_id",
      references: {
        table: "Products",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Inventories", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_inventories_user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Inventories");
  },
};
