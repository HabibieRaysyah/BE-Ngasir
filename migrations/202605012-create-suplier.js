"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Supliers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      store_id: {
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.ENUM(["Aktif", "Non-Aktif"]),
      },
      address: {
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
    await queryInterface.addConstraint("Supliers", {
      fields: ["store_id"],
      type: "foreign key",
      name: "fk_supliers_store_id",
      references: {
        table: "Stores",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Supliers");
  },
};
