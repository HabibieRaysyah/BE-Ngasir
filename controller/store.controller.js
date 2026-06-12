const { response } = require("../helpers/response.format");
const Validator = require("fastest-validator");
const { User, Store, StoreUser } = require("../models/");
const v = new Validator();

module.exports = {
  createStore: async (req, res) => {
    try {
      const { name, type, user_id } = req.body;

      console.log(user_id);

      const schema = {
        name: { type: "string", min: 5 },
        type: { type: "enum", values: ["coffee_shop", "retail"] },
        user_id: { type: "number", positive: true, integer: true },
      };

      const data = {
        user_id: Number(user_id),
        name: name,
        type: type,
      };

      const validate = v.validate(data, schema);

      if (validate.length > 0) {
        return res.status(400).json(response(400, "Validator Error", validate));
      }

      if (!req.file) {
        return res
          .status(400)
          .json(response(400, "Validasi Error", "Image is not found"));
      }

      const  generateRandomCode = (length) => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
        }
        return result;
      }
      
      const codeRandom = generateRandomCode(8);

      const store = await Store.create({
        owner_id: data.user_id,
        name: data.name,
        type: data.type,
        code_store: codeRandom,
        image: req.file.filename,
      });

      const latestStore = await Store.findOne({
        order: [["createdAt", "DESC"]],
      });

      const storeUser = await StoreUser.create({
        store_id: latestStore.id,
        user_id: latestStore.owner_id,
        role: "owner",
      });

      const formatData = {
        message: "Success",
        storeUser,
        store,
      };

      return res.status(201).json(response(201, "Created", formatData));
    } catch (err) {
      return res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
