const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.put("/:nguoi_dung_id", UserController.updateUserInfo);

module.exports = router;
