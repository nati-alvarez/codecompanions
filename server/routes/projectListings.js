const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/projectListings");

router.get("/", passport.authenticate("jwt", {session: false}), controller.getProjectListings);
router.post("/search", passport.authenticate("jwt", {session: false}), controller.searchProjectListings);
router.get("/:id", passport.authenticate("jwt", {session: false}), controller.getProjectListing);
router.post('/:id/apply', passport.authenticate("jwt", {session: false}), controller.apply);


module.exports = router;