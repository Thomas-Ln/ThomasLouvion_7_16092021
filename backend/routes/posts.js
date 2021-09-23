const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");

router.post("/", postsCtrl.create);
router.get("/", postsCtrl.getAll);
router.get("/:id", postsCtrl.getOneById);
router.put("/:id", postsCtrl.update);
// router.delete("/", postsCtrl.clear);
router.delete("/:id", postsCtrl.delete);

module.exports = router;
