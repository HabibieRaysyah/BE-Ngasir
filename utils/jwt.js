const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    process.env.AUTH_SECRET,
    { expiresIn: "1d" },
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.AUTH_SECRET);
};
