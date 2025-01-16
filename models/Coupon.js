const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coupon = sequelize.define(
  "coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    max_uses: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    current_uses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Coupon;
