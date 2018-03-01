const router = require("express").Router();

//routes
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use('/auth', authRoutes);
router.use("/users", userRoutes);

module.exports = router;