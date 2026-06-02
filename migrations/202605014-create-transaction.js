"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      store_id: {
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.BIGINT,
      },
      code_transaction: {
        type: Sequelize.STRING,
      },
      total_price: {
        type: Sequelize.DECIMAL,
      },
      paid_amount: {
        type: Sequelize.DECIMAL,
      },
      change_amount: {
        type: Sequelize.DECIMAL,
      },
      method: {
        type: Sequelize.ENUM(['cash', 'qris', 'e-wallet']),
      },
      date : {
        type : Sequelize.DATE,
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
    await queryInterface.addConstraint("Transactions", {
      fields: ["store_id"],
      type: "foreign key",
      name: "fk_transactions_store_id",
      references: {
        table: "Stores",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Transactions", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_transactions_user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
