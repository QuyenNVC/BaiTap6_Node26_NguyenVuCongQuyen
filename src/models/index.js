const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "restaurant_management",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456aA@",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect!");
  })
  .catch((error) => {
    console.log("Connect failed!", error);
    throw error;
  });

// sequelize.sync();

module.exports = sequelize;
