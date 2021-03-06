const router = require('express').Router();
const passport = require("passport");
const controller = require("../controllers/project");

router.get("/", passport.authenticate("jwt", {session: false}), controller.getMyProjects);
router.post("/", passport.authenticate("jwt", {session: false}), controller.createProject);
router.get("/:id", passport.authenticate("jwt", {session: false}), controller.getProject);

router.post("/:id/chat", passport.authenticate("jwt", {session: false}), controller.createTextChannel);
router.put("/:id/chat", passport.authenticate("jwt", {session: false}), controller.sendMessage);

router.get("/:id/channels", passport.authenticate("jwt", {session: false}), controller.getTextChannels);

router.post("/:id/tasks", passport.authenticate("jwt", {session: false}), controller.createTask);
router.put("/:id/tasks", passport.authenticate('jwt', {session: false}), controller.completeTask);

router.post("/project-invitation", passport.authenticate('jwt', {session: false}), controller.sendProjectInvitation);

module.exports = router;