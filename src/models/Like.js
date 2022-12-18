const { DataTypes, NOW, literal } = require("sequelize");
const sequelize = require("./connectDB");
const Restaurant = require("./Restaurant");
const User = require("./User");

const Like = sequelize.define(
  "Like",
  {
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
      primaryKey: true,
      // references: {
      //   model: User,
      //   key: "userId",
      // },
    },
    resId: {
      type: DataTypes.INTEGER,
      field: "res_id",
      allowNull: false,
      primaryKey: true,
      // references: {
      //   model: Restaurant,
      //   key: "resId",
      // },
    },
    dateLike: {
      type: DataTypes.DATE,
      field: "date_like",
      defaultValue: literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "like_res",
    timestamps: false,
  }
);

module.exports = Like;
