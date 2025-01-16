const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },
    customer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CartItem;
