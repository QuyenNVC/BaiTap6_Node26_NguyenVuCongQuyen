const { DataTypes, NOW } = require("sequelize");
const sequelize = require(".");

const Like = sequelize.define(
  "Like",
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
    dateLike: {
      type: DataTypes.DATE,
      field: "date_like",
      defaultValue: NOW,
      allowNull: false,
    },
  },
  {
    tableName: "like_res",
    timestamps: false,
  }
);
Like.removeAttribute("id");

module.exports = Like;
