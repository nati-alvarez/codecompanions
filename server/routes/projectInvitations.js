const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/projectInvitations");

router.get("/:id", controller.getInvitation);
router.post("/:id/accept", controller.acceptInvitation);
router.post("/:id/decline", controller.declineInvitation);

module.exports = router;