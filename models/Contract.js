const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const Plan = require("./Plan");
const Payment = require("./Payment");

const Contract = sequelize.define(
  "contract",
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
    plan_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    first_payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    monthly_payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    next_payment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Contract.belongsTo(Order, { foreignKey: "order_id" });
Contract.belongsTo(Plan, { foreignKey: "plan_id" });
Contract.hasMany(Payment, { foreignKey: "contract_id" });

module.exports = Contract;
