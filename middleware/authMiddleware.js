const { decode } = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");
const { response } = require("../helpers/response.format");
const { auth_secret } = require("../config/base.config");
const jwt = require("jsonwebtoken");



const AuthMiddleware = (req, res, next) => {
  const authHeader  = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json(response(401, "Unauthorized", "Please login and try again"));
  }

  const token = authHeader.split(' ')[1];

  try {
    
    const check = jwt.verify(token, auth_secret);
    req.user = check;
    next();
  } catch (err) {
    return res
      .status(401)
      .json(response(401, "unauthorized", err.message));
  }
};
  
module.exports = AuthMiddleware;
