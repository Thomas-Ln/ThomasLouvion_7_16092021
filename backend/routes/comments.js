const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const commentsCtrl = require("../controllers/comments");

router.get("/admin/:id", auth, commentsCtrl.getAllByPostForAdmin);
router.put("/moderate/:id", auth, commentsCtrl.moderate);
router.post("/", auth, commentsCtrl.create);
router.get("/post/:id", auth, commentsCtrl.getAllByPost);
router.get("/:id", auth, commentsCtrl.getOneById);
router.put("/:id", auth, commentsCtrl.update);
router.delete("/:id", auth, commentsCtrl.delete);

module.exports = router;
