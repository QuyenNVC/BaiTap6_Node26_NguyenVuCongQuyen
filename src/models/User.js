const { DataTypes } = require("sequelize");
const sequelize = require("./connectDB");
const Food = require("./Food");
const Order = require("./Order");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "user_id",
    },
    fullName: {
      type: DataTypes.STRING(255),
      field: "full_name",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      field: "email",
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(value, salt);
        // password ở đây là tên property chứ không phải tên cột
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  {
    tableName: "user",
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    hooks: {
      afterSave: (record) => {
        delete record.dataValues.password;
      },
    },
  }
);

// User.belongsToMany(Food, {
//   through: "order",
//   foreignKey: "user_id",
//   otherKey: "food_id",
// });

// Food.belongsToMany(User, {
//   through: "order",
//   foreignKey: "food_id",
//   otherKey: "user_id",
// });

module.exports = User;
