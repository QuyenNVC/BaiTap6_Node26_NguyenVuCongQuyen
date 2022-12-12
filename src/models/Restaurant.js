const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    resId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "res_id",
    },
    resName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: "res_name",
    },
    image: {
      type: DataTypes.STRING(255),
      field: "Image",
    },
    desc: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "restaurant",
    timestamps: false,
  }
);

module.exports = Restaurant;
