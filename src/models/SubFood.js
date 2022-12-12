const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require(".");
const Food = require("./Food");

const SubFood = sequelize.define(
  "SubFood",
  {
    subId: {
      field: "sub_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subName: {
      field: "sub_name",
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    subPrice: {
      field: "sub_price",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    foodId: {
      field: "food_id",
      type: INTEGER,
      allowNull: false,
      references: {
        model: Food,
        key: "foodId",
      },
    },
  },
  {
    tableName: "sub_food",
    timestamps: false,
  }
);

module.exports = SubFood;
