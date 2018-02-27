const router = require("express").Router();

router.get("/", (req, res)=>{
    res.send("this is the api home route")
});

module.exports = router;