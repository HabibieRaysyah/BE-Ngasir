const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { User, Store, StoreUser } = require("../models/");
const { where } = require("sequelize");
const v = new Validator();

module.exports = {
  getStoreUser: async (req, res) => {
    try {
      const { page, limit } = req.query;

      const offset = (Number(page) - 1) * Number(limit);

      const userId = req.user.id;

      const { count, rows } = await StoreUser.findAndCountAll({
        offset: offset,
        limit: Number(limit),
        include: Store,
        where: {user_id : userId}
      },);
     
      const formatPagination = {
        data : rows,
        limit : Number(limit),
        rows : (Number(offset) + 1) + "-" + (Number(offset) + rows.length),
        total : count,
        totalPages : Math.ceil(count / limit),
        page: page,
      }
 
      return res.status(200).json(response(200, "Success", formatPagination));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
