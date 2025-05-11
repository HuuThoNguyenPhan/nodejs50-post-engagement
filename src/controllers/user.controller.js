const dataSource = require("../config/db");
const picture = require("../entities/picture");
const save_picture = require("../entities/save_picture");
const user = require("../entities/user");

module.exports.updateUserInfo = async (req, res) => {
    try {
      const { nguoi_dung_id } = req.params;
      const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
  
      const userRepo = dataSource.getRepository(user);
      const pictureRepo = dataSource.getRepository(picture);
      const savePicRepo = dataSource.getRepository(save_picture);
  
      const existingUser = await userRepo.findOneBy({ nguoi_dung_id: parseInt(nguoi_dung_id) });
      if (!existingUser) return res.status(404).json({ message: "User not found" });

      if (email && email !== existingUser.email) {
        const emailExists = await userRepo.findOneBy({ email });
        if (emailExists) return res.status(400).json({ message: "Email is already used!" });
        existingUser.email = email;
      }
  
      if (mat_khau) {
        existingUser.mat_khau = await bcrypt.hash(mat_khau, 10);
      }
  
      if (ho_ten) existingUser.ho_ten = ho_ten;
      if (tuoi) existingUser.tuoi = tuoi;

      if (anh_dai_dien) {
        const uploadResult = await uploadBase64(
          anh_dai_dien,
          `${process.env.CLOUDINARY_FOLDER}/${existingUser.email}/avatar`
        );
        if (uploadResult?.url) {
          const urlImage = uploadResult.url;
          existingUser.anh_dai_dien = urlImage;
  
          const newPic = pictureRepo.create({
            ten_hinh: "avatar",
            duong_dan: urlImage,
            mo_ta: "avatar",
            nguoi_dung: existingUser,
          });
          await pictureRepo.save(newPic);
  
          await savePicRepo.save({
            nguoi_dung_id: existingUser.nguoi_dung_id,
            hinh_id: newPic.hinh_id,
          });
        }
      }
  
      await userRepo.save(existingUser);
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  