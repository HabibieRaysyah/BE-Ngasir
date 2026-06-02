const { where } = require("sequelize");
const { response } = require("../helpers/response.format");
const { Transaction, Transaction_Item, Product } = require("../models/");

module.exports = {
  getTransItem: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const getTransItem = await Transaction_Item.findAll({
        where: { store_id: id },
        include: [Product, Transaction],
      });

      return res.status(200).json(response(200, "Succes", getTransItem));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
