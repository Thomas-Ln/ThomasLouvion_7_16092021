/*
  [ATTENTION] this file does not create the database
  this file use the models to create the tables (if they don't exists)
*/
module.exports = (sequelize, Sequelize) => {
  const db = {};
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.users = require("../../models/users")(sequelize, Sequelize);
  db.posts = require("../../models/posts")(sequelize, Sequelize);
  db.comments = require("../../models/comments")(sequelize, Sequelize);

  // Associations
  // User has many Posts
  db.users.hasMany(db.posts, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
  db.posts.belongsTo(db.users);

  // User has many Comments
  db.users.hasMany(db.comments, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
  db.comments.belongsTo(db.users);

  // Post has many Comments
  db.posts.hasMany(db.comments, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
  });
  db.comments.belongsTo(db.posts);

  db.sequelize.sync();
};
