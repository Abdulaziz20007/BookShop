const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderItem;
