const express = require("express");
const router = express.Router();
const UploadController = require("../controllers/upload.controller");

router.post("/base64", UploadController.uploadBase64);

module.exports = router;
