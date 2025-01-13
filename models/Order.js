const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./Customer");
const OrderItem = require("./OrderItem");
const Contract = require("./Contract");

const Order = sequelize.define(
  "order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    delivery_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

Order.belongsTo(Customer, { foreignKey: "customer_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });
Order.hasOne(Contract, { foreignKey: "order_id" });

module.exports = Order;
