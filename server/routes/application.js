const router = require("express").Router();
const controller = require("../controllers/application");
const passport = require("passport");

router.post("/:id", passport.authenticate("jwt", {session: false}), controller.replyToApplication)

module.exports = router;