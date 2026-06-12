const { response } = require("../helpers/response.format");
const { Inventory, Product, User } = require("../models/");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  createInventory: async (req, res) => {
    try {
      const {
        store_id,
        product_id,
        type,
        difference,
        stock,
        user_id,
        referensi,
        notes,
        date,
      } = req.body;

      const schema = {
        store_id: { type: "number", positive: true, integer: true },
        product_id: { type: "number", positive: true, integer: true },
        type: { type: "enum", values: ["In", "Sale"] },
        difference: { type: "number", integer: true },
        stock: { type: "number", integer: true },
        user_id: { type: "number", positive: true, integer: true },
        referensi: { type: "string", optional: true },
        notes: { type: "string", optional: true },
      };

      // Proses date dengan aman
      let processedDate = null;
      if (date) {
        processedDate = new Date(date);
        // Validasi apakah date valid
        if (isNaN(processedDate.getTime())) {
          return res
            .status(400)
            .json(response(400, "Invalid date format", null));
        }
      }

      const data = {
        store_id: Number(store_id),
        product_id: Number(product_id),
        type: type,
        difference: Number(difference),
        stock: Number(stock),
        user_id: Number(user_id),
        referensi: referensi || null,
        notes: notes || null,
        date: processedDate || new Date(), // Gunakan processedDate atau default new Date()
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      // Optional: Check if product exists
      const product = await Product.findByPk(data.product_id);
      if (!product) {
        return res.status(404).json(response(404, "Product not found", null));
      }

      // Optional: Check if user exists
      const user = await User.findByPk(data.user_id);
      if (!user) {
        return res.status(404).json(response(404, "User not found", null));
      }

      const inventory = await Inventory.create(data);

      const productOld = await Product.findOne({ where: { id: product_id } });
      if (type == "In") {
        const updateData = await Product.update({ stock : Number(productOld.stock) + Number(stock) },{ where: { id: product_id } });
      }

      return res.status(201).json(response(201, "Created", inventory));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  getInventory: async (req, res) => {
    try {
      const { store_id } = req.params;

      const getInventory = await Inventory.findAll({
        where: { store_id: store_id },
        include: [Product, User],
      });

      return res.status(200).json(response(200, "Success", getInventory));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
