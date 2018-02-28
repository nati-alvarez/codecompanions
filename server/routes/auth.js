const router = require("express").Router();
const controller = require("../controllers/auth");
const passport = require("passport");

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;