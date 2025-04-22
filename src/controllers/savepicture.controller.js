const save_picture = require("../entities/save_picture");
const dataSource = require("../config/db");

module.exports.savePicture = async (req, res) => {
  const { hinh_id } = req.body;

  const savedPic = await checkSavePicture(hinh_id);

  if (savedPic) {
    return res.status(400).json({ message: `hinh_id: ${hinh_id} is saved!` });
  }

  await dataSource.getRepository(save_picture).save({
    hinh_id,
    nguoi_dung_id: req.user.nguoi_dung_id,
  });

  return res.status(201).json({ message: "success" });
};

module.exports.checkSavePicture = async (req, res) => {
  const { hinh_id } = req.query;
  const savedPic = await checkSavePicture(hinh_id, req.user.nguoi_dung_id);

  if (!savedPic) {
    return res.status(201).json({ is_saved: false });
  }

  return res.status(201).json({ is_saved: true, picture: savedPic.hinh });
};

const checkSavePicture = async (hinh_id, nguoi_dung_id) => {
  if (!hinh_id) {
    throw new Error("hinh_id is null or not valid!");
  }

  const saved = await dataSource.getRepository(save_picture).findOne({
    where: {
      hinh_id,
      nguoi_dung_id,
    },
  });

  return saved;
};
