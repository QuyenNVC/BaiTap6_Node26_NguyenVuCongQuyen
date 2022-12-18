const sequelize = require("./connectDB");
const Food = require("./Food");
const FoodType = require("./FoodType");
const Like = require("./Like");
const Order = require("./Order");
const Rate = require("./Rate");
const Restaurant = require("./Restaurant");
const SubFood = require("./SubFood");
const User = require("./User");

// User.hasMany(Like, {
//   foreignKey: "userId",
//   as: "likedRestaurants",
// });

// User.hasMany(Rate, {
//   foreignKey: "userId",
//   as: "ratedRestaurants",
// });

// Restaurant.hasMany(Like, {
//   foreignKey: "resId",
//   as: "likedUsers",
// });

// Restaurant.hasMany(Rate, {
//   foreignKey: "resId",
//   as: "ratedUsers",
// });
User.belongsToMany(Restaurant, {
  through: Like,
  foreignKey: "userId",
  otherKey: "resId",
  as: "likedRestaurants",
});
Restaurant.belongsToMany(User, {
  through: Like,
  otherKey: "userId",
  foreignKey: "resId",
  as: "likedUsers",
});

User.belongsToMany(Restaurant, {
  through: Rate,
  foreignKey: "userId",
  otherKey: "resId",
  as: "ratedRestaurants",
});
Restaurant.belongsToMany(User, {
  through: Rate,
  otherKey: "userId",
  foreignKey: "resId",
  as: "ratedUsers",
});

FoodType.hasMany(Food, { as: "foods", foreignKey: "typeId" });
Food.belongsTo(FoodType, {
  foreignKey: "typeId",
  as: "foodType",
});

Food.hasMany(SubFood, { as: "subFoods", foreignKey: "foodId" });
SubFood.belongsTo(Food, {
  foreignKey: "foodId",
  as: "food",
});

User.belongsToMany(Food, {
  through: Order,
  foreignKey: "userId",
  otherKey: "foodId",
  as: "foods",
});

Food.belongsToMany(User, {
  through: Order,
  foreignKey: "userId",
  otherKey: "foodId",
  as: "users",
});

// sequelize.sync({ alter: true });
module.exports = {
  sequelize,
};
