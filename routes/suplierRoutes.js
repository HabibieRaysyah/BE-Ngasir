const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const suplierController = require("../controller/suplier.controller");

router.post("/", upload.none(), suplierController.createSuplier);
router.put("/", upload.none(), suplierController.updateSuplier);
router.get("/:store_id", suplierController.getSuplier);
router.delete("/:suplier_id", suplierController.deleteSuplier);

module.exports = router;
