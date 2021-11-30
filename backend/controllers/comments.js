const { Sequelize, Op } = require("sequelize");
const sequelize = require("../config/database/connect")(Sequelize);
const Posts = require("../models/posts")(sequelize, Sequelize);
const Users = require("../models/users")(sequelize, Sequelize);
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
// Set fetch items limit for pagination
const PAGE_LIMIT = 24;

exports.create = (req, res, next) => {
  Comments.create(req.body)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllByPostForAdmin = (req, res, next) => {
  Comments.findAndCountAll({
    where: {
      post_id: req.params.id,
    },
    include: { model: Users, attributes: ["name"] },
    order: [["createdAt", "DESC"]],
    offset: (req.query.page - 1) * PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllByPost = (req, res, next) => {
  Comments.findAll({
    where: {
      post_id: req.params.id,
      moderated: { [Op.eq]: 0 },
    },
    include: { model: Users, attributes: ["name"] },
  })
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

exports.moderate = (req, res, next) => {
  Comments.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
