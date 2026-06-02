const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { Suplier } = require("../models/");
const { type } = require("node:os");
const store = require("../models/store");
const { where } = require("sequelize");
const v = new Validator();
module.exports = {
  createSuplier: async (req, res) => {
    try {
      const { store_id, name, contact, phone, status, address } = req.body;

      const schema = {
        name: { type: "string", min: 3 },
        contact: { type: "string", min: 5 },
        phone: { type: "number", postitive: true, integer: true, min: 8 },
        status: { type: "enum", values: ["Aktif", "Non-Aktif"] },
        address: { type: "string", min: 5 },
      };

      const data = {
        store_id: Number(store_id),
        name: name,
        contact: contact,
        phone: Number(phone),
        status: status,
        address: address,
      };

      console.log(data.phone);

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const createData = await Suplier.create({
        store_id: data.store_id,
        name: data.name,
        contact: data.contact,
        phone: data.phone,
        status: data.status,
        address: data.address,
      });

      return res.status(201).json(response(201, "Created", createData));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  updateSuplier: async (req, res) => {
    try {
      const { store_id, suplier_id, name, contact, phone, status, address } =
        req.body;

      const schema = {
        store_id: { type: "number", postitive: true, integer: true },
        name: { type: "string", min: 3 },
        contact: { type: "string", min: 5 },
        phone: { type: "number", postitive: true, integer: true, min: 8 },
        status: { type: "enum", values: ["Aktif", "Non-Aktif"] },
        address: { type: "string", min: 5 },
      };

      const data = {
        store_id: Number(store_id),
        name: name,
        contact: contact,
        phone: Number(phone),
        status: status,
        address: address,
      };
      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const updateData = await Suplier.update(data, {
        where: { id: suplier_id },
      });

      const dataDisplay = await Suplier.findOne({ where: { id: suplier_id } });

      return res.status(200).json(response(200, "Updated", dataDisplay));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  deleteSuplier: async (req, res) => {
    try {
      const { suplier_id } = req.params;

      const deleteSuplier = await Suplier.destroy({
        where: { id: suplier_id },
        force: true,
      });

      return res.status(200).json(response(200, "Success"));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
  getSuplier: async (req, res) => {
    try {
      const { store_id } = req.params;

      //   const schema = {
      //     store_id: { typye: "number", postitive: true, integer: true },
      //   };

      //   const data = {
      //     store_id: Number(store_id),
      //   };

      //   const validate = v.validate(data, schema);

      //   if (validate.length > 0) {
      //     return res.json(400).json(response(400, "Validate Error", validate));
      //   }

      const getData = await Suplier.findAll({
        where: { store_id: store_id },
      });

      return res.status(200).json(response(200, "Succes", getData));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
