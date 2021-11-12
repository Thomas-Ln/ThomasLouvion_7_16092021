const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
// router.get("/role/:userId", usersCtrl.getRole);
router.delete("/:userId", usersCtrl.delete);

module.exports = router;
