const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");

// router.get("/role/:userId", usersCtrl.getRole);
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/:userId", usersCtrl.delete);

module.exports = router;
