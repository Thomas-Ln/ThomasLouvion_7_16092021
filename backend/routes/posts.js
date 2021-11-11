const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const postsCtrl = require("../controllers/posts");

router.post("/", auth, multer, postsCtrl.create);
router.get("/type/text", auth, postsCtrl.getAllWhereTextIsNotNull);
router.get("/type/image", auth, postsCtrl.getAllWhereImageIsNotNull);
router.get("/:id", auth, postsCtrl.getOneById);
router.put("/:id", auth, postsCtrl.update);
// router.delete("/", auth, postsCtrl.clear);
router.delete("/:id", auth, postsCtrl.delete);

module.exports = router;
