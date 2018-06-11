const router = require("express").Router();
const axios = require("axios"); //axios for trendyskills api

//routes
const authRoutes = require("./auth");
const userRoutes = require("./user");
const projectListingRoutes = require("./projectListings");
const projectRoutes = require("./project");
const applicationRoutes = require("./application");
const notificationRoutes = require("./notifications");
const projectInvitationRoutes = require("./projectInvitations");
const blogRoutes = require("./blog");

router.use('/auth', authRoutes);
router.use("/users", userRoutes);
router.use("/project-listings", projectListingRoutes);
router.use("/projects", projectRoutes);
router.use("/applications", applicationRoutes);
router.use("/project-invitations", projectInvitationRoutes)
router.use("/notifications", notificationRoutes);
router.use("/blog", blogRoutes);

// proxying trendyskills api bc it doesn't support CORS
// TODO: maybe put this somewhere else shit idk lol
router.use('/trendyskills', (req, res) => {
    axios.get(`${process.env.TRENDY_SKILLS_URL}&like=${req.query.keyword}&key=${process.env.TRENDY_SKILLS_KEY}`).then(data=>{
        return res.status(200).json({success: true, skills: data.data.keywords});
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({success: false, message: "Error getting suggestions.", err});
    });
})

module.exports = router;