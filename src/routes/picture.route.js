const express = require("express");
const router = express.Router();
const PictureController = require("../controllers/picture.controller");
const SavePictureController = require("../controllers/savepicture.controller");

router.post("/", PictureController.addPicture);
router.get("/", PictureController.getictureById);
router.delete("/", PictureController.deletePicture);
router.get("/get-list", PictureController.getListPicture);
router.get("/search-by-name", PictureController.searchPicByName);
router.post("/save", SavePictureController.savePicture);
router.get("/check-save", SavePictureController.checkSavePicture);


module.exports = router;
