const { DataTypes, NOW } = require("sequelize");
const sequelize = require(".");

const Rate = sequelize.define(
  "Rate",
  {
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
    },
    resId: {
      type: DataTypes.INTEGER,
      field: "res_id",
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateRate: {
      type: DataTypes.DATE,
      field: "date_rate",
      defaultValue: NOW,
      allowNull: false,
    },
  },
  {
    tableName: "rate_res",
    timestamps: false,
  }
);
Rate.removeAttribute("id");

module.exports = Rate;
