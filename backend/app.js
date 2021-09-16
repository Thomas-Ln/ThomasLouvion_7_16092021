const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

// database connection
const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PWD,
  {
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => console.log("[MYSQL] connection success !"))
  .catch((err) => console.log("[MYSQL] connection failed :", err));

// allow Cross Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello World !");
});

module.exports = app;
