const router = require("express").Router();
const controller = require("../controllers/blog");
const passport = require("passport");

router.get("/posts", controller.getAllPosts);
router.get("/posts/:id", controller.getPost);
router.post("/posts", passport.authenticate("jwt", {session: false}), controller.createNewPost);
router.post("/posts/:id", passport.authenticate("jwt", {session: false}), controller.updatePost);
router.delete("/posts/:id", passport.authenticate("jwt", {session: false}), controller.deletePost);
module.exports = router;