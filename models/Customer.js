const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const CartItem = require("./CartItem");
const Review = require("./Review");

const Customer = sequelize.define(
  "customer",
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    birth_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passport_seria: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    passport_number: {
      type: DataTypes.BIGINT,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    verification: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    refresh_token: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

Customer.hasMany(Order, { foreignKey: "customer_id" });
Customer.hasMany(CartItem, { foreignKey: "customer_id" });
Customer.hasMany(Review, { foreignKey: "customer_id" });

module.exports = Customer;
