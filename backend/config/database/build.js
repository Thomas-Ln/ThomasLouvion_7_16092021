/*
  [ATTENTION] this file does not create the database
  this file use the models to create the tables (if they don't exists)
*/
module.exports = (sequelize, Sequelize) => {
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = require("../../models/users")(sequelize, Sequelize);
  db.roles = require("../../models/roles")(sequelize, Sequelize);
  db.posts = require("../../models/posts")(sequelize, Sequelize);
  db.comments = require("../../models/comments")(sequelize, Sequelize);

  db.sequelize.sync();
};
