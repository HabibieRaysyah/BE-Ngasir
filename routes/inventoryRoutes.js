const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const invetoryController = require("../controller/invetory.controller");

router.get("/:store_id", invetoryController.getInventory);
router.post("/", upload.none(), invetoryController.createInventory);

module.exports = router;
