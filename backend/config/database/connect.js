// Database connection
module.exports = (Sequelize) => {
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

  return sequelize;
};
