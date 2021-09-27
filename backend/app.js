const express = require("express");
const app = express();
const cors = require("cors");

// Sync Database
const { Sequelize } = require("sequelize");
const sequelize = require("./config/database/connect")(Sequelize);
require("./config/database/build")(sequelize, Sequelize);

// Routes
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

// Allow Cross Origin
app.use(cors());

app.use(express.json());

// Routing
app.use("/api/auth", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

module.exports = app;
