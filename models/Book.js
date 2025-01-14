const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");
const Author = require("./Author");
const Image = require("./Image");
const Review = require("./Review");

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
      type: DataTypes.STRING,
      defaultValue: "",
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

Book.belongsTo(Category, { foreignKey: "category_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });
Book.hasMany(Image, { foreignKey: "book_id" });
Book.hasMany(Review, { foreignKey: "book_id" });

module.exports = Book;
