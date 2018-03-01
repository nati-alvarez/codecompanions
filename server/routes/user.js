const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/user");

router.get("/:username", passport.authenticate('jwt', {session: false}), controller.getUser);
router.put("/:username", passport.authenticate('jwt', {session: false}), controller.updateUser);

module.exports = router;