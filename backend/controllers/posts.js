const { Sequelize, Op, QueryTypes } = require("sequelize");
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

/** Add a new post */
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

/** Fetch ALL post
 *  wheter they are moderated or not
 */
exports.getAll = (req, res, next) => {
  /** Return count of posts ( needed for pagination ) */
  const getAllPostsCount = sequelize.query(
    "SELECT COUNT(id) AS count FROM posts",
    {
      type: QueryTypes.SELECT,
    }
  );

  /** Get all posts in range offset,limit
   * + join author name & comments count
   */
  const getPosts = Posts.findAll({
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "count_comments"],
      ],
    },
    include: [
      { model: Users, attributes: ["name"] },
      { model: Comments, attributes: [] },
    ],
    group: "id",
    order: [["createdAt", "DESC"]],
    offset: (req.query.page - 1) * PAGE_LIMIT,
    limit: PAGE_LIMIT,
    subQuery: false,
  });

  Promise.all([getAllPostsCount, getPosts])
    .then((data) =>
      res.send({
        count: data[0][0].count,
        rows: [...data[1]],
      })
    )
    .catch((error) => res.send(error));
};

/** Fetch IMAGE posts */
exports.getAllWhereImageIsNotNull = (req, res, next) => {
  Posts.findAndCountAll({
    where: { image: { [Op.not]: null }, moderated: { [Op.eq]: 0 } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: (req.query.page - 1) * PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Fetch TEXT posts */
exports.getAllWhereTextIsNotNull = (req, res, next) => {
  Posts.findAndCountAll({
    where: { text: { [Op.not]: null }, moderated: { [Op.eq]: 0 } },
    include: [{ model: Users, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
    offset: (req.query.page - 1) * PAGE_LIMIT,
    limit: PAGE_LIMIT,
  })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Fetch ONE post by id + join author name & comments */
exports.getOneById = (req, res, next) => {
  Posts.findByPk(req.params.id)
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Update post by Id */
exports.update = (req, res, next) => {
  Posts.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};

/** Delete post by Id */
exports.delete = (req, res, next) => {
  Posts.destroy({ where: { id: req.params.id } })
    .then((data) => res.json("Post deleted !"))
    .catch((error) => res.send(error));
};

/** Update moderated value of post by Id */
exports.moderate = (req, res, next) => {
  Posts.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
};
