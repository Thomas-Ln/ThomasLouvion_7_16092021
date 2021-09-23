const { Sequelize } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Comments = require("../models/comments")(sequelize, Sequelize);

exports.create = (req, res, next) => {
  Comments.create(req.body)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

// get all comments for one post
exports.getAllByPost = (req, res, next) => {
  Comments.findAll({ where: { post_id: req.params.post_id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getOneById = (req, res, next) => {
  Comments.findByPk(req.params.id)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.update = (req, res, next) => {
  Comments.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.delete = (req, res, next) => {
  Comments.destroy({ where: { id: req.params.id } })
    .then((data) => res.json("Comment deleted !"))
    .catch((error) => res.send(error));
};

// delete all posts for one user (author_id)
exports.clear = (req, res, next) => {
  Comments.destroy({ where: { author_id: req.params.author_id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
