const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const transactionController = require("../controller/transaction.controller");

router.post('/', upload.none(), transactionController.createTransaction);
router.get('/:store_id',  transactionController.getTransaction);

module.exports = router;