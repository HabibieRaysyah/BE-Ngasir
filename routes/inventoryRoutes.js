const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const invetoryController = require("../controller/invetory.controller");

router.get('/:store_id' , invetoryController.getInventory);

module.exports= router;