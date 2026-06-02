const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");

const userController = require("../controller/userController");

router.post("/signup", upload.none(), userController.createUser);
router.post("/login", upload.none(), userController.setLogin);

module.exports = router;
