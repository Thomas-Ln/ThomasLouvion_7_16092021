const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const sequelize = require("./config/database");

// set database tables
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/users")(sequelize, Sequelize);
db.roles = require("./models/roles")(sequelize, Sequelize);
db.posts = require("./models/posts")(sequelize, Sequelize);
db.comments = require("./models/comments")(sequelize, Sequelize);

/* remove force true for production */
db.sequelize.sync({ force: true });

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

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World !" });
});

module.exports = app;
