const { DataTypes } = require("sequelize");
const sequelize = require(".");
const FoodType = require("./FoodType");
const SubFood = require("./SubFood");
const User = require("./User");

const Food = sequelize.define(
  "Food",
  {
    foodId: {
      field: "food_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foodName: {
      field: "food_name",
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(255),
    },
    typeId: {
      field: "type_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FoodType,
        key: "typeId",
      },
    },
  },
  {
    tableName: "food",
    timestamps: false,
  }
);

// Food.belongsTo(FoodType);
// Food.hasMany(SubFood);
Food.hasMany(SubFood, { as: "sub_food", foreignKey: "food_id" });
FoodType.hasMany(Food, { as: "food", foreignKey: "type_id" });

module.exports = Food;
