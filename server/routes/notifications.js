const express = require("express");
const router = express.Router();
const passport = require("passport");

//controller
const controller = require("../controllers/notifications");

router.get("/", passport.authenticate("jwt", {session: false}), controller.getNotifications);

module.exports = router;