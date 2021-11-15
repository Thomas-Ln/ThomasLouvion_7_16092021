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
  db.users.hasMany(db.posts, { onDelete: "CASCADE" });
  db.posts.belongsTo(db.users, { foreignKey: "user_id" });

  // User has many Comments
  db.users.hasMany(db.comments, { onDelete: "CASCADE" });
  db.comments.belongsTo(db.users, { foreignKey: "user_id" });

  // Post has many Comments
  db.posts.hasMany(db.comments, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
  });
  db.comments.belongsTo(db.posts);

  db.sequelize.sync();
};
