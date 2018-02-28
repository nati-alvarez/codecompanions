const router = require("express").Router();
const controller = require("../controllers/auth");
const passport = require("passport");

router.post("/login", controller.login);
router.get("/", passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.send("elementary os is the most retarded linux distro to exist")
});

module.exports = router;