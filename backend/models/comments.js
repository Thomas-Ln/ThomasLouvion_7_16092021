module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define( "comment", {
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
      user_id: { // author
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      moderated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { underscored: true }
  );

  return Comments;
};
