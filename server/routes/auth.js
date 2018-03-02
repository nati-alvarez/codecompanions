const router = require("express").Router();
const controller = require("../controllers/auth");
const passport = require("passport");

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/verify", controller.verify);
router.post("/resend-email", controller.resendVerificationEmail);
router.post("/send-recover-password", controller.sendPasswordRecoveryEmail);
router.post("/reset-password", controller.resetPassword);

module.exports = router;