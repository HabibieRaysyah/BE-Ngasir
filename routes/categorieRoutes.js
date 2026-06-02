const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const categoriesController = require("../controller/categories.controller");

router.post("/", upload.none(), categoriesController.createCategories);
router.get("/:store_id", categoriesController.getCategorie);
router.put("/", upload.none(), categoriesController.updateCategorie);
router.delete("/:categori_id", categoriesController.deleteCategorie);

module.exports = router;
