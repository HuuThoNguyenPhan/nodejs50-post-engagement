const { DataSource } = require("typeorm");
const save_picture = require("../entities/save_picture");
const picture = require("../entities/picture");
const user = require("../entities/user");
const comment = require("../entities/comment");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [user, save_picture, picture, comment],
  synchronize: true,
  logging: false,
});

module.exports = AppDataSource;
