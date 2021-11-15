module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("post", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },
      user_id: { // author
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      moderated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  return Posts;
};
