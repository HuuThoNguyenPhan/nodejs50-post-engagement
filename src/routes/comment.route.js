const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");

router.post("/", CommentController.createComment);
router.get("/", CommentController.getCommentByIdPic);

module.exports = router;
