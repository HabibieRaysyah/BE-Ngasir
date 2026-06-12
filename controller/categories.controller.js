const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { User, Store, StoreUser, Categorie } = require("../models/");
const { where } = require("sequelize");
const categorie = require("../models/categorie");
const { type } = require("node:os");
const { stat } = require("node:fs");
const v = new Validator();

module.exports = {
  createCategories: async (req, res) => {
    try {
      const { store_id, name, status } = req.body;

      const schema = {
        name: { type: "string", min: 3 },
        status: { type: "boolean" },
        store_id: { type: "number", positive: true, integer: true },
      };
      console.log(status);
      const data = {
        store_id: Number(store_id),
        name: name,
        status: Boolean(status),
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const cateogrie = await Categorie.create(data);

      return res.status(201).json(response(201, "Created", cateogrie));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error ", err.message));
    }
  },

  updateCategorie: async (req, res) => {
    try {
      const { store_id, categorie_id, name, status } = req.body;

      const schema = {
        store_id: { type: "number", positive: true, integer: true },
        categorie_id: { type: "number", positive: true, integer: true },
        name: { type: "string", min: 3 },
        status: { type: "boolean" },
      };

      const data = {
        store_id: Number(store_id),
        categorie_id: Number(categorie_id),
        name: name,
        status: Boolean(status),
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const updateCategorie = await Categorie.update(
        {
          store_id: data.store_id,
          name: data.name,
          status: data.status,
        },
        {
          where: { id: categorie_id },
        },
      );

      return res.status(200).json(response(200, "Success", updateCategorie));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  deleteCategorie: async (req, res) => {
    try {
      const { categori_id } = req.params;

      const schema = {
        categori_id: { type: "number", positive: true, integer: true },
      };

      const data = {
        categori_id: Number(categori_id),
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }


      const deleteData = await Categorie.destroy({
        where: { id : data.categori_id },
      });

      return res.status(200).json(response(200, "Success", deleteData));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  getCategorie: async (req, res) => {
    try {
      const { store_id } = req.params;

      console.log(store_id);

      const categorie = await Categorie.findAll({
        where: { store_id: store_id },
      });

      return res.status(200).json(response(200, "Success", categorie));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
