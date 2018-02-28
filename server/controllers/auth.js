const User = require("../models/User");
const uuid = require("uuid/v1");
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

exports.signup = (req, res) => {
    var newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        verificationCode: uuid(),
    });

    newUser.save().then(user =>{ 
        res.status(201).json({success: true, user, message: "Account created. Check your email to verify your account."});
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occured while signing up."});
    });
}

module.exports = exports;