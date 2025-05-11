const dataSource = require("../config/db");
const comment = require("../entities/comment");

module.exports.createComment = async (req, res) => {
  const { hinh_id, noi_dung } = req.body;
  if (!hinh_id) {
    return res.status(400).json({ message: "hinh_id is null or invalid!" });
  }
  if (!noi_dung) {
    return res.status(400).json({ message: "noi_dung is null or invalid!" });
  }
  const newComment = dataSource.getRepository(comment).create({
    nguoi_dung: req.user,
    noi_dung,
    hinh: { hinh_id },
  });
  await dataSource.getRepository(comment).save(newComment);
  return res.status(201).json({ message: "success" });
};
