const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "BinhLuan",
  tableName: "binh_luan",
  columns: {
    binh_luan_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    ngay_binh_luan: {
      type: "date",
    },
    noi_dung: {
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
    hinh: {
      type: "many-to-one",
      target: "HinhAnh",
      joinColumn: {
        name: "hinh_id",
      },
    },
  },
});
