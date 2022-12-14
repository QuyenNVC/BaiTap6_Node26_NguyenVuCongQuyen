const { DataTypes, NOW } = require("sequelize");
const sequelize = require("./connectDB");
const Restaurant = require("./Restaurant");
const User = require("./User");

const Rate = sequelize.define(
  "Rate",
  {
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    resId: {
      type: DataTypes.INTEGER,
      field: "res_id",
      allowNull: false,
      primaryKey: true,
      references: {
        model: Restaurant,
        key: "resId",
      },
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
