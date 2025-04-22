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

module.exports.getCommentByIdPic = async (req, res) => {
  const { hinh_id } = req.query;
  if (!hinh_id) {
    return res.status(400).json({ message: "hinh_id is null or invalid!" });
  }

  const ressult = dataSource.getRepository(comment).findOne({
    where: {
      hinh: {
        hinh_id: parseInt(hinh_id),
      },
    },
    relations: {
      nguoi_dung: true,
      hinh: true,
    },
  });

  return res.status(201).json({ comment: ressult });
};
