const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define(
  "review",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Review;
