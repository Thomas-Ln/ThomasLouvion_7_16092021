const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Posts = require("../models/posts")(sequelize, Sequelize);

exports.create = (req, res, next) => {
  let postWithImage = null;

  if (req.file) {
    const postObject = JSON.parse(req.body.post);
    postWithImage = {
      ...postObject,
      image: `http://localhost:3000/images/${req.file.filename}`,
    };
  }

  Posts.create(postWithImage ?? req.body)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAll = (req, res, next) => {
  Posts.findAll()
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllByType = (req, res, next) => {
  const postType = req.params.type;
  const statement = `SELECT * FROM posts WHERE ${postType} IS NOT NULL`;

  sequelize
    .query(statement, {
      model: Posts,
      mapToModel: true,
      replacements: { post_type: req.params.type },
      type: QueryTypes.SELECT,
    })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getOneById = (req, res, next) => {
  Posts.findByPk(req.params.id)
    .then((data) => res.send(data))
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
