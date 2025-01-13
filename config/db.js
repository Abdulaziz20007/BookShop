const { Sequelize } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("db_name"),
  config.get("db_usermame"),
  config.get("db_password"),
  {
    dialect: "postgres",
    logging: false,
    host: config.get("db_host"),
    port: config.get("db_port"),
  }
);

module.exports = sequelize;
