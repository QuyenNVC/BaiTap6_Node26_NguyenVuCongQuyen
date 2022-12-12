const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Food = require("./Food");

const FoodType = sequelize.define(
  "FoodType",
  {
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "type_id",
    },
    typeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: "type_name",
    },
  },
  {
    tableName: "food_type",
    timestamps: false,
  }
);

// FoodType.hasMany(Food, { as: "foods", foreignKey: "type_id" });

module.exports = FoodType;
