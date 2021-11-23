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

// Set fetch posts limit & offset for pagination
const PAGE_LIMIT = 12;

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
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "count_comments"],
      ],
    },
    group: "id",
    include: [
      { model: Users, attributes: ["name"] },
      { model: Comments, attributes: [] },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllWhereImageIsNotNull = (req, res, next) => {
  Posts.findAndCountAll({
    where: { image: { [Op.not]: null }, moderated: { [Op.eq]: 0 } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: req.query.page * PAGE_LIMIT - PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

exports.getAllWhereTextIsNotNull = (req, res, next) => {
  Posts.findAndCountAll({
    where: { text: { [Op.not]: null }, moderated: { [Op.eq]: 0 } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: req.query.page * PAGE_LIMIT - PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

// also include COMMENTS
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

exports.moderate = (req, res, next) => {
  Posts.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
