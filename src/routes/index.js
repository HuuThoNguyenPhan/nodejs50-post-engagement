const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const uploadRouter = require("./upload.route");
const pictureRouter = require("./picture.route");
const commentRouter = require("./comment.route");
const userRouter = require("./user.route");
const auth = require("../middlewares/auth");

router.use("/auth", authRouter);
router.use("/upload", auth, uploadRouter);
router.use("/picture", auth, pictureRouter);
router.use("/comment", auth, commentRouter);
router.use("/user", auth, userRouter);
module.exports = router;
