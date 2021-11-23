const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users")(sequelize, Sequelize);
const Posts = require("../models/posts")(sequelize, Sequelize);
const Comments = require("../models/comments")(sequelize, Sequelize);

// ASSOCIATIONS
// ------------
Users.hasMany(Posts);
Posts.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Comments);
Comments.belongsTo(Users, { foreignKey: "user_id" });

Posts.hasMany(Comments, { foreignKey: "post_id" });
Comments.belongsTo(Posts);

// CONTROLLER METHODS
// ------------------
/** Fetch user name, email, posts number, comments number */
exports.getProfile = (req, res, next) => {
  const statement = `
    SELECT u.name, u.email, u.created_at,
    (SELECT COUNT(p.id) FROM posts p WHERE user_id = :user_id) AS posts,
    (SELECT COUNT(c.id) FROM comments c WHERE user_id = :user_id) AS comments
    FROM users u WHERE u.id = :user_id;
  `;

  sequelize
    .query(statement, {
      replacements: { user_id: req.params.userId },
      type: QueryTypes.SELECT,
    })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Extract userId from headers Authorization Bearer token
 *  then fetch the admin column for this userId
 * @returns Object { admin: status } where status == true or false */
exports.getRole = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;

  Users.findByPk(userId, {
    attributes: ["admin"],
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Create a new USER */
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = Users.build({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role_id: 1,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json({ error }));
};

/** Check if USER exists and check his password,
 * if it's the correct one: return the user ID & a Json Web Token.
 * ( This token will grant access to all routes which require an authorization ) */
exports.login = (req, res, next) => {
  Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Not found !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Invalid password !" });
          }

          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/** Delete USER
 *  & delete cascade his POSTS & COMMENTS */
exports.delete = (req, res, next) => {
  Users.destroy({ where: { id: req.params.userId } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
