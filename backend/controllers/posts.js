const { Sequelize } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Posts = require("../models/posts")(sequelize, Sequelize);

exports.create = (req, res, next) => {
  Posts.create(req.body)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAll = (req, res, next) => {
  Posts.findAll()
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getOneById = (req, res, next) => {
  Posts.findByPk(req.params.id)
    .then(
      (data) => res.send(data) // + comments
    )
    .catch((error) => res.send(error));
};

exports.update = (req, res, next) => {
  Posts.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.delete = (req, res, next) => {
  Posts.destroy({ where: { id: req.params.id } })
    .then((data) => res.json("Post deleted !"))
    .catch((error) => res.send(error));
};

// delete all comments for one user (author_id)
exports.clear = (req, res, next) => {
  Posts.destroy({ where: { author_id: req.params.author_id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
