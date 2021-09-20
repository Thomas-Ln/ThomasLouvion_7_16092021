module.exports = (sequelize, Sequelize) => {
  const Roles = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Roles;
};
