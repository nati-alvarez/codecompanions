const router = require('express').Router();
const passport = require("passport");
const controller = require("../controllers/project");

router.get("/", passport.authenticate("jwt", {session: false}), controller.getMyProjects);
router.post("/", passport.authenticate("jwt", {session: false}), controller.createProject);
router.get("/:id", passport.authenticate("jwt", {session: false}), controller.getProject);
router.post("/:id/chat", passport.authenticate("jwt", {session: false}), controller.createTextChannel);
router.put("/:id/chat", passport.authenticate("jwt", {session: false}), controller.sendMessage);
router.post("/:id/tasks", passport.authenticate("jwt", {session: false}), controller.createTask);

module.exports = router;