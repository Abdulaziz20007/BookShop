const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

module.exports = Customer;
