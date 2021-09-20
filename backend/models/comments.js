module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });
  return Comments;
};
