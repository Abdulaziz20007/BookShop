const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Plan = sequelize.define(
  "plan",
  {
    plan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Plan;
