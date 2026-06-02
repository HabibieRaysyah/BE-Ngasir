const passwordHash = require("password-hash");
const { User } = require("../models");
const { where } = require("sequelize");
const { generateToken } = require("../utils/jwt");
const { response } = require("../helpers/response.format");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res
          .status(400)
          .json(response(400, "Wrong Input", "Name is required"));
      }

      if (!email) {
        return res
          .status(400)
          .json(response(400, "Wrong Input", "Email is required"));
      }

      if (!password) {
        return res
          .status(400)
          .json(response(400, "Wrong Input", "Password is required"));
      }

      const passwordHashed = await passwordHash.generate(password);

      const user = await User.create({
        name: name,
        email: email,
        password: passwordHashed,
      });

      res.status(201).json(response(201, "created", user));
    } catch (err) {
      res.status(500).json(response(500, "Server Error", err.message));
    }
  },
  setLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json(response(404, "User is defined", "User is defined"));
      }

      const isMatch = await passwordHash.verify(
        password,
        user.password,
      );

      if (!isMatch) {
        return res
          .status(401)
          .json(response(401, "Is Not Match", "Password is incorect"));
      }

      const token = generateToken(user);

      const formatData = {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      return res.status(200).json(response(200, "success", formatData));
    } catch (err) {
      res.status(500).json(response(500, "Server Error", err.message));
    }
  },
};
