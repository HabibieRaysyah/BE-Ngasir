const { response } = require("../helpers/response.format");
const { Inventory, Product, User } = require("../models/");

module.exports = {
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
