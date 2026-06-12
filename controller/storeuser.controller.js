const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { User, Store, StoreUser } = require("../models/");
const { where } = require("sequelize");
const { type } = require("node:os");
const v = new Validator();

module.exports = {
  getStoreUser: async (req, res) => {
    try {
      const { page, limit } = req.query;

      const offset = (Number(page) - 1) * Number(limit);

      const userId = req.user.id;

      if (page && limit) {
        const { count, rows } = await StoreUser.findAndCountAll({
          offset: offset,
          limit: Number(limit),
          include: [Store, User],
          where: { user_id: userId },
        });

        const formatPagination = {
          data: rows,
          limit: Number(limit),
          rows: Number(offset) + 1 + "-" + (Number(offset) + rows.length),
          total: count,
          totalPages: Math.ceil(count / limit),
          page: page,
        };
        return res.status(200).json(response(200, "Success", formatPagination));
      } else {
        const storeUser = await StoreUser.findAll({
          where: { user_id: userId },
          include: [Store, User],
        });
        return res.status(200).json(response(200, "Success", storeUser));
      }
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },

  joinStoreWithCode: async (req, res) => {
    try {
      const { code,  user_id } = req.body;

      const schema = {
        code: { type: "string" },
        user_id: { type: "number", positive: true, integer: true },
      };

      const data = {
        code: code,
        user_id: Number(user_id),
      };

      const validate = v.validate(data, schema);
      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validate Error", validate));
      }

      const getStorebyCode = await Store.findOne({
        where: { code_store: code },
      });


      const isALereadyyUser = await StoreUser.findOne({
        where: {store_id : getStorebyCode.id}
      })

      if (!getStorebyCode) {
        return res
          .status(400)
          .json(response(400, "Validate Error", "code not found"));
      }

      if (isALereadyyUser.user_id == data.user_id){
        return res.status(400).json(response(400,"Validate Error" ,"Code is Already use"))
      }

      const addUserByCode = await StoreUser.create({
        store_id: getStorebyCode.id,
        user_id: data.user_id,
        role: "cashier",
      });

      return res.status(201).json(response(201, "Created", addUserByCode));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
