const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Image;
