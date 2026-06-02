const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const transactionitemController = require("../controller/transactionitem.controller");

router.get("/:id", transactionitemController.getTransItem);

module.exports = router;
