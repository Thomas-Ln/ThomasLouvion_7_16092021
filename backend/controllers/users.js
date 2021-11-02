const { Sequelize } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Users = require("../models/users")(sequelize, Sequelize);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
