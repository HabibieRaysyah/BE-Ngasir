const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const productController = require("../controller/product.controller");

router.post('/', upload.single('img'), productController.createProduct)
router.put('/', upload.single('img'), productController.updateProduct)
router.get('/:store_id', productController.getProduct)
router.delete('/:product_id', productController.deleteProduct)

module.exports = router;