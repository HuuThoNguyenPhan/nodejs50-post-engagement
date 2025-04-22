const { ILike } = require("typeorm");
const dataSource = require("../config/db");
const picture = require("../entities/picture");
const save_picture = require("../entities/save_picture");
const { uploadBase64 } = require("./upload.controller");

module.exports.getictureById = async (req, res) => {
  const { hinh_id } = req.query;

  if(!hinh_id){
    return res.status(400).json({ message: "hinh_id is null or invalid!" });
  }

  const picture = await dataSource.getRepository(save_picture).findOne({
    where: {
      hinh_id: parseInt(hinh_id),
    },
  });

  return res.status(201).json({ picture });
};

module.exports.getListPicture = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  let [data, total] = await dataSource
    .getRepository(save_picture)
    .findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        ngay_luu: "DESC",
      },
    });

  data = data.map((item) => ({
    ngay_luu: item.ngay_luu,
    nguoi_dung: item.nguoi_dung,
    hinh: item.hinh,
  }));
  return res.status(201).json({ total, data });
};

module.exports.searchPicByName = async (req, res) => {
  const { search_name } = req.query;

  const list = await dataSource.getRepository(picture).find({
    where: {
      ten_hinh: ILike(`%${search_name}%`),
    },
    order: {
      hinh_id: "DESC",
    },
  });

  return res.status(200).json({ data: list, total: list.length });
};

module.exports.addPicture = async (req, res) => {
  const { file_base64, ten_hinh, mo_ta } = req.body;

  let duong_dan = "";

  if (!file_base64) {
    return res.status(400).json({ message: "filebase64 is null or invalid!" });
  }

  var ressult = await uploadBase64(
    file_base64,
    `${process.env.CLOUDINARY_FOLDER}/${req.user.email}/pictures`
  );
  if (!ressult) {
    return res.status(400).json({ message: "Upload image failed!" });
  }
  duong_dan = ressult.url;
  const newPic = dataSource.getRepository(picture).create({
    ten_hinh,
    duong_dan,
    mo_ta,
    nguoi_dung: req.user,
  });
  await dataSource.getRepository(picture).save(newPic);

  return res.status(201).json({ message: "success" });
};

module.exports.deletePicture = async (req, res) => {
  const { hinh_id } = req.query;
  await dataSource.getRepository(picture).delete({ hinh_id });
  return res.status(201).json({ message: "success" });
};
