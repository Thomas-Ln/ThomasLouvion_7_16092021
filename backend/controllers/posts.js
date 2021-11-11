const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Posts = require("../models/posts")(sequelize, Sequelize);
const Users = require("../models/users")(sequelize, Sequelize);
const Comments = require("../models/comments")(sequelize, Sequelize);

// Set fetch posts limit & offset for pagination
const PAGE_LIMIT = 12;

// --- Associations ---
Users.hasMany(Posts, { foreignKey: "author_id" });
Posts.belongsTo(Users);

Users.hasMany(Comments, { foreignKey: "author_id" });
Comments.belongsTo(Users);

Posts.hasMany(Comments, { foreignKey: "post_id" });
Comments.belongsTo(Posts);

// --- Controller Methods ---
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
  Posts.findAll({
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllWhereImageIsNotNull = (req, res, next) => {
  Posts.findAll({
    where: { image: { [Op.not]: null } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: req.query.page * PAGE_LIMIT - PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllWhereTextIsNotNull = (req, res, next) => {
  Posts.findAll({
    where: { text: { [Op.not]: null } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: req.query.page * PAGE_LIMIT - PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getOneById = (req, res, next) => {
  Posts.findByPk(req.params.id, {
    include: [
      { model: Users, attributes: ["name"] },
      { model: Comments, include: [{ model: Users, attributes: ["name"] }] },
    ],
  })
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
