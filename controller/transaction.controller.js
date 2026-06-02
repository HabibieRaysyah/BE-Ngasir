const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const {
  Transaction,
  Transaction_Item,
  Product,
  Inventory,
} = require("../models/");
const { where } = require("sequelize");
const transaction = require("../models/transaction");
const { type } = require("node:os");
const { diff } = require("node:util");
const v = new Validator();

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const { store_id, user_id, total_price, paid_amount, method, products } =
        req.body;

      const schema = {
        store_id: { type: "number", positive: true, integer: true },
        user_id: { type: "number", positive: true, integer: true },
        method: { type: "enum", values: ["cash", "qris", "e-wallet"] },
        total_price: { type: "number", positive: true, integer: true },
        paid_amount: { type: "number", positive: true, integer: true },
      };

      const data = {
        store_id: store_id,
        user_id: user_id,
        method: method,
        total_price: total_price,
        paid_amount: paid_amount,
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validasi Error", validate));
      }

      const change_amount = Number(paid_amount) - Number(total_price);

      if (change_amount < 0) {
        return res.status(400).json(response(400, "The money is not enough."));
      }

      const date = new Date();
      const timestamp = date.toISOString().slice(0, 10).replace(/-/g, "");
      const randomHex = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      const code_transaction = `TRX-${timestamp}-${randomHex}`;

      const today = new Date().toISOString().split("T")[0];

      const transaction = await Transaction.create({
        store_id: data.store_id,
        user_id: data.user_id,
        code_transaction: code_transaction,
        method: data.method,
        total_price: data.total_price,
        date: today,
        paid_amount: data.paid_amount,
        change_amount: change_amount,
      });

      const transactionId = await Transaction.findOne({
        order: [["createdAt", "DESC"]],
      });

      products?.map(async (product, index) => {
        const productId = await Product.findByPk(product.id);
        const subTotal = productId.selling_price * Number(product.quantity);

        console.log(productId.selling_price);
        console.log(subTotal);

        const transactionIitems = await Transaction_Item.create({
          store_id: store_id,
          transaction_id: transactionId.id,
          product_id: productId.id,
          quantity: product.quantity,
          price: productId.selling_price,
          subtotal: subTotal,
        });

        const updateProduct = await Product.update(
          { stock: productId.stock - product.quantity },
          {
            where: { id: productId.id },
          },
        );
        const productIdNew = await Product.findByPk(product.id);

        const inventory = await Inventory.create({
          store_id: store_id,
          product_id: productIdNew.id,
          user_id: user_id,
          type: "Sale",
          difference:   product.quantity,
          stock: productIdNew.stock,
          referensi: transactionId.code_transaction,
          notes: "Penjual Pos",
          date: new Date(),
        });
      });

      return res.status(201).json(response(201, "Created", transaction));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  getTransaction: async (req, res) => {
    try {
      const { store_id } = req.params;

      const getData = await Transaction.findAll({
        where: { store_id: store_id },
      });

      return res.status(200).json(response(200, "Success", getData));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
