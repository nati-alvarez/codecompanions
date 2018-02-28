const User = require("../models/User");
const uuid = require("uuid/v1");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//email server for sending verification email
const Email = require('email-templates');


const email = new Email({
    message: {
      from: 'codecompanions@zoho.com'
    },
    transport: {
      jsonTransport: true
    }
});

exports.login = (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if(!user) return res.status(401).json({success: false, message: "User not found."});
        if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({success: false, message: "Incorrect username or password."});
        if(user.verified !== 1) return res.status(401).json({success: false, message: "Please verify your account to log in."});
        var token = jwt.sign({user}, process.env.JWT_SECRET);
        res.status(200).json({success: true, user, token});
    }).catch(err => {
        res.status(500).json({success: false, message: "An error occured while loggin in.", err});
    });
}

exports.signup = (req, res) => {
    var newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        verificationCode: uuid(),
    });
    
    newUser.save().then(user =>{ 
        res.status(201).json({success: true, user, message: "Account created. Check your email to verify your account."});
        //send verification email
        email.send({
            template: 'verify',
            message: {
                to: user.email
            },
            locals: {
                name: user.name.split(" ")[0],
                verificationCode: user.verificationCode
            }
        })
        .then(console.log)
        .catch(console.error);
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occured while signing up."});
    });
}

exports.verify = (req, res) => {
    User.findOneAndUpdate({verificationCode: req.body.verificationCode}, {set: {verified: 1}}, {new: true}).then(user => {
        if(!user) return res.status(401).json({success: false, message: "Invalid token."});
        res.status(201).json({success: true, message: "Your account was verified. You may now log in."});
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occurred. Please try again."});
    });
}

module.exports = exports;