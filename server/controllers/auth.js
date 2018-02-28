const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(!user) return res.status(401).json({success: false, message: "User not found."});
        if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({success: false, message: "Incorrect username or password."});
        var token = jwt.sign({user}, process.env.JWT_SECRET);
        res.status(200).json({success: true, user, token});
    }).catch(err => {
        res.status(500).json({success: false, message: "An error occured while loggin in.", err});
    });
}

module.exports = exports;