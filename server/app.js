require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codecompanions");

//passport config for api auth
const User = require("./models/User");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
passport.use(new jwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({_id: payload.user._id}).then(user => {
        if(!user) return done(null, false, {message: "You are not authorized to perform this action."});
        return done(null, user)
    }).catch(err => {
        return done(err, false, {message: "Error authenticating user."});
    });
}));
app.use(passport.initialize());

//use cors if in development
//not needed in prod because api also serves react app
if(process.env.NODE_ENV === "development"){
    const cors = require("cors");
    app.use(cors());
}

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//api routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

//serves react app on all other routes
app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "..", "dist/index.html"));
});

app.listen(8000, console.log("App is running"));