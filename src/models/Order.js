const { INTEGER, STRING } = require("sequelize");
const sequelize = require(".");
const Food = require("./Food");
const User = require("./User");

const Order = sequelize.define(
  "Order",
  {
    userId: {
      field: "user_id",
      type: INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      primaryKey: true,
    },
    foodId: {
      field: "food_id",
      type: INTEGER,
      allowNull: false,
      references: {
        model: Food,
        key: "foodId",
      },
      primaryKey: true,
    },
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    code: {
      type: STRING(255),
      unique: true,
      allowNull: false,
    },
    arrSubId: {
      field: "arr_sub_id",
      type: STRING(255),
      primaryKey: true,
    },
  },
  {
    tableName: "order",
    timestamps: false,
  }
);

module.exports = Order;
