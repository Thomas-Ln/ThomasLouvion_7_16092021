const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const usersCtrl = require("../controllers/users");

router.get("/profile/:userId", auth, usersCtrl.getProfile);
router.get("/admin", auth, usersCtrl.getRole);
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/:userId", usersCtrl.delete);

module.exports = router;
