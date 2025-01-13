const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Book = require("./Book");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_category_id: {
      type: DataTypes.BIGINT,
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

Category.hasMany(Book, { foreignKey: "category_id" });
Category.belongsTo(Category, {
  as: "parent",
  foreignKey: "parent_category_id",
});

module.exports = Category;
