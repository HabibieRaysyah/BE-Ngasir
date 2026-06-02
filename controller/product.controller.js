const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { Product, Categorie, Suplier } = require("../models/");
const { where, UUIDV1 } = require("sequelize");
const product = require("../models/product");
const { customeAlphabet, customAlphabet } = require("nanoid");
const v = new Validator();
const fs = require("fs");
const path = require("path");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const {
        store_id,
        category_id,
        suplier_id,
        name,
        purchase_price,
        selling_price,
        stock,
        min_stock,
        status,
      } = req.body;

      const schema = {
        store_id: { type: "number", positive: true, integer: true },
        category_id: { type: "number", positive: true, integer: true },
        suplier_id: { type: "number", positive: true, integer: true },
        name: { type: "string", min: 3 },
        purchase_price: { type: "number", positive: true, integer: true },
        selling_price: { type: "number", positive: true, integer: true },
        stock: { type: "number", positive: true, integer: true },
        min_stock: { type: "number", positive: true, integer: true },
        status: { type: "boolean" },
      };

      const data = {
        store_id: Number(store_id),
        category_id: Number(category_id),
        suplier_id: Number(suplier_id),
        name: name,
        purchase_price: Number(purchase_price),
        selling_price: Number(selling_price),
        stock: Number(stock),
        min_stock: Number(min_stock),
        status: Boolean(status),
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      if (!req.file) {
        return res.status(400).json(response(400, "Img is Required"));
      }

      if (min_stock > stock) {
        return res
          .status(400)
          .json(response(400, "min stock cannot exceed stock"));
      }

      const nan = customAlphabet("012345689", 13);
      const barcode = nan();

      const product = await Product.create({
        store_id: data.store_id,
        category_id: data.category_id,
        suplier_id: data.suplier_id,
        name: data.name,
        purchase_price: data.purchase_price,
        selling_price: data.selling_price,
        stock: data.stock,
        min_stock: data.min_stock,
        barcode: barcode,
        img: req.file.filename,
        status: Boolean(data.status),
      });

      return res.status(201).json(response(201, "Created", product));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error ", err.message));
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        store_id,
        category_id,
        suplier_id,
        product_id,
        name,
        purchase_price,
        selling_price,
        stock,
        min_stock,
        status,
      } = req.body;

      const schema = {
        store_id: { type: "number", positive: true, integer: true },
        category_id: { type: "number", positive: true, integer: true },
        suplier_id: { type: "number", positive: true, integer: true },
        product_id: { type: "number", positive: true, integer: true },
        name: { type: "string", min: 3 },
        purchase_price: { type: "number", positive: true, integer: true },
        selling_price: { type: "number", positive: true, integer: true },
        stock: { type: "number", positive: true, integer: true },
        min_stock: { type: "number", positive: true, integer: true },
        status: { type: "boolean" },
      };

      const data = {
        store_id: Number(store_id),
        category_id: Number(category_id),
        suplier_id: Number(suplier_id),
        product_id: Number(product_id),
        name: name,
        purchase_price: Number(purchase_price),
        selling_price: Number(selling_price),
        stock: Number(stock),
        min_stock: Number(min_stock),
        status: Boolean(status),
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const product = await Product.findByPk(data.product_id);

      if (req.file) {
        const imageName = Product.getDataValue("img");
        const filePath = path.join(__dirname, "../uploads", imageName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSyncc(filePath);
        }
      }

      const updateData = await Product.update(
        {
          store_id: data.store_id,
          category_id: data.category_id,
          suplier_id: data.suplier_id,
          name: data.name,
          purchase_price: data.purchase_price,
          selling_price: data.selling_price,
          stock: data.stock,
          min_stock: data.min_stock,
          barcode: product.barcode,
          img: req.file ? req.file.filename : product.getDataValue("image"),
          status: Boolean(data.status),
        },
        { where: { id: data.product_id } },
      );

      const updatted = await Product.findOne({
        where: { id: data.product_id },
        include: [Categorie, Suplier],
      });

      return res.status(200).json(response(200, "Success", updatted));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { product_id } = req.params;
      const product = await Product.findByPk(product_id);

      const imageName = product.getDataValue("img");
      // cari image ke folder upload
      const filePath = path.join(__dirname, "../uploads", imageName);
      // cek jika file ada di folder tsb
      if (fs.existsSync(filePath)) {
        //hapus file
        fs.unlinkSync(filePath);
      }

      const deleteData = await Product.destroy({ where: { id: product_id } });

      return res.status(200).json(response(200, "Success"));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  getProduct: async (req, res) => {
    try {
      const { store_id } = req.params;

      const products = await Product.findAll({
        where: { store_id: Number(store_id) },
        include: [Categorie, Suplier],
      });

      return res.status(200).json(response(200, "Success", products));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
