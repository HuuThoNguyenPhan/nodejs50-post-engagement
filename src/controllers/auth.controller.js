const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");
const { uploadBase64 } = require("./upload.controller");
const save_picture = require("../entities/save_picture");
const picture = require("../entities/picture");
const user = require("../entities/user");
const dataSource = require("../config/db");

module.exports.register = async (req, res) => {
  const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
  const existing = await dataSource.getRepository(user).findOneBy({ email });
  if (existing) return res.status(400).json({ message: "Email is existed!" });
  let urlImage = "";
  const hashedPassword = await bcrypt.hash(mat_khau, 10);

  if (anh_dai_dien) {
    var res = await uploadBase64(
      anh_dai_dien, `${process.env.CLOUDINARY_FOLDER}/${email}/avartar`
    );
    if (res) {
      urlImage = res.url;
    }
  }

  const newUser = dataSource.getRepository(user).create({
    email,
    mat_khau: hashedPassword,
    ho_ten,
    tuoi,
    anh_dai_dien: anh_dai_dien ? urlImage : process.env.PICTURE_DEFAULT,
  });
  await dataSource.getRepository(user).save(newUser);

  const newPic = dataSource.getRepository(picture).create({
    ten_hinh: "avatar",
    duong_dan: urlImage,
    mo_ta: "avatar",
    nguoi_dung_id: newUser.nguoi_dung_id,
  });
  await dataSource.getRepository(picture).save(newPic);

  await dataSource.getRepository(save_picture).save({
    nguoi_dung_id: newUser.nguoi_dung_id,
    hinh_id: newPic.hinh_id,
  });
  return res.status(201).json({ message: "Success" });
};

module.exports.login = async (req, res) => {
  const { email, mat_khau } = req.body;
  const userEnty = await dataSource.getRepository(user).findOneBy({ email });
  if (!userEnty) return res.status(404).json({ message: "Email not Found!" });

  const isMatch = await bcrypt.compare(mat_khau, userEnty.mat_khau);
  if (!isMatch) return res.status(400).json({ message: "Wrong password!" });

  const token = createToken({
    nguoi_dung_id: userEnty.nguoi_dung_id,
    email: userEnty.email,
  });
  return res.status(200).json({ token });
};
