const express = require("express");
const upload = require("../middleware/uploads");
const router = express.Router();
const storeController = require("../controller/store.controller");
const storeuserController = require("../controller/storeuser.controller");

router.post("/", upload.single("image"), storeController.createStore);
router.get("/", storeuserController.getStoreUser);
router.post('/join', upload.none(), storeuserController.joinStoreWithCode)

module.exports = router;
