const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "HinhAnh",
  tableName: "hinh_anh",
  columns: {
    hinh_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    ten_hinh: {
      type: "varchar",
    },
    duong_dan: {
      type: "varchar",
    },
    mo_ta: {
      type: "varchar",
    },
  },
  relations: {
    nguoi_dung: {
      type: "many-to-one",
      target: "NguoiDung",
      joinColumn: {
        name: "nguoi_dung_id",
      },
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
