const User = require("../models/User");
const uuid = require("uuid/v1");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//email server for sending verification email
const Email = require('email-templates');

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const email = new Email({
    message: {
      from: process.env.EMAIL_USER
    },
    transport: transporter
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
    User.findOne({verificationCode: req.body.verificationCode}).then(user => {
        if(!user) return res.status(401).json({success: false, message: "Invalid token."});
        user.verified = 1;
        user.save().then(data => {
            res.status(201).json({success: true, message: "Your account was verified. You may now log in."});
        });
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occurred. Please try again."});
    });
}

exports.resendVerificationEmail = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user) return res.status(404).json({success: false, message: "User not found."});
        email.send({
            template: "verify",
            message: {
                to: user.email
            },
            locals: {
                name: user.name.split(" ")[0],
                verificationCode: user.verificationCode
            }
        }).then(data => {
            console.log(data);
            res.status(200).json({success: true, message: "Verification email sent."});
        }).catch(console.error);
    }).catch(err => {
        res.status(500).json({success: false, err, message: "Error sending verification email."});
    });
}

exports.sendPasswordRecoveryEmail = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user) return res.status(404).json({success: false, message: "User not found."});
        email.send({
            template: "passwordRecovery",
            message: {
                to: user.email
            },
            locals: {
                id: user._id,
                name: user.name.split(" ")[0]
            }
        }).then(data => {
            res.status(200).json({success: true, message: "Password recovery email sent."});
        }).catch(err => {
            console.log(err);
            res.status(500).json({success: false, message: "Error sending password recovery email."});
        })
    });
}

exports.resetPassword = (req, res) => {
    User.findById(req.body.id).then(user => {
        if(!user) return res.status(404).json({success: false, message: "User not found."});
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save().then(user => {
            res.status(201).json({success: true, message: "Your password has been reset."});
        });
    }).catch(err => {
        res.status(500).json({success: false, err, message: "Error resetting password."});
    })
}

module.exports = exports;