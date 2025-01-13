const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Author = sequelize.define(
  "author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    biography: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    birth_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    nationality: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    wiki_url: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Author;
