const express = require("express");
const { handleError } = require("./helpers/error");
const { sequelize } = require("./models");
const v1 = require("./routes/v1");

sequelize.sync();
const app = express();
const port = 4000;

app.use(express.json());
app.use("/api/v1", v1);
app.use(handleError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
