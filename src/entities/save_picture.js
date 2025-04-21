const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "LuuAnh",
  tableName: "luu_anh",
  columns: {
    nguoi_dung_id: {
      type: "int",
      primary: true,
    },
    hinh_id: {
      type: "int",
      primary: true,
    },
    ngay_luu: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoi_dung: {
      type: "many-to-one",
      target: "NguoiDung",
      joinColumn: {
        name: "nguoi_dung_id",
      },
      eager: true,
    },
    hinh: {
      type: "many-to-one",
      target: "HinhAnh",
      joinColumn: {
        name: "hinh_id",
      },
      eager: true,
    },
  },
});
