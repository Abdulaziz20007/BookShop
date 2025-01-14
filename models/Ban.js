const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");
const Customer = require("./Customer");

const Ban = sequelize.define(
  "ban",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    reason: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

Ban.belongsTo(Admin, { foreignKey: "admin_id" });
Ban.belongsTo(Customer, { foreignKey: "user_id" });

module.exports = Ban;
