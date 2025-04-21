const { cloudinary } = require("../config/cloudinary");

module.exports.uploadBase64 = async (req, res) => {
  const result = await uploadBase64(req.body.file_base64, req.body.folder);

  return res.status(201).json({
    message: "Success",
    url: result.secure_url,
    public_id: result.public_id,
  });
};

module.exports.uploadBase64 = async (file_base64, folder) => {
  if (!file_base64 || !file_base64.startsWith("data:image")) {
    throw new Error("Invalid image base64!");
  }

  const uploadResponse = await cloudinary.uploader.upload(file_base64, {
    folder: folder || "nodejs50",
    public_id: Date.now(),
  });

  return uploadResponse;
};
