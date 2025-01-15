const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define(
  "book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    publisher: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    publication_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Book;
