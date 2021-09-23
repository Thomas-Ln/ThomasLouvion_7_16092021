const express = require("express");
const router = express.Router();

const commentsCtrl = require("../controllers/comments");

router.post("/", commentsCtrl.create);
router.get("/post/:post_id", commentsCtrl.getAllByPost);
router.get("/:id", commentsCtrl.getOneById);
router.put("/:id", commentsCtrl.update);
// router.delete("/", commentsCtrl.clear);
router.delete("/:id", commentsCtrl.delete);

module.exports = router;
