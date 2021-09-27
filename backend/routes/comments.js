const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const commentsCtrl = require("../controllers/comments");

router.post("/", auth, commentsCtrl.create);
router.get("/post/:post_id", auth, commentsCtrl.getAllByPost);
router.get("/:id", auth, commentsCtrl.getOneById);
router.put("/:id", auth, commentsCtrl.update);
// router.delete("/", auth, commentsCtrl.clear);
router.delete("/:id", auth, commentsCtrl.delete);

module.exports = router;
