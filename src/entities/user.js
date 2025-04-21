const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "NguoiDung",
  tableName: "nguoi_dung",
  columns: {
    nguoi_dung_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    email: {
      type: "varchar",
    },
    mat_khau: {
      type: "varchar",
    },
    ho_ten: {
      type: "varchar",
    },
    tuoi: {
      type: "int",
    },
    anh_dai_dien: {
      type: "varchar",
    },
  },
  relations: {
    hinh_anh: {
      type: "one-to-many",
      target: "HinhAnh",
    },
    binh_luan: {
      type: "one-to-many",
      target: "BinhLuan",
    },
    luu_anh: {
      type: "one-to-many",
      target: "LuuAnh",
    },
  },
});
