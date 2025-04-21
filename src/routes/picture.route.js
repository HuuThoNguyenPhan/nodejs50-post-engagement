const express = require("express");
const router = express.Router();
const PictureController = require("../controllers/picture.controller");

router.post("/", PictureController.addPicture);
router.get("/get-list", PictureController.getListPicture);
router.get("/search-by-name", PictureController.searchPicByName);

module.exports = router;
