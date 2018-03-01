const User = require("../models/User");

exports.getUser = (req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if (!user) return res.status(404).json({success: false, message: "User not found."});
        res.status(200).json({success: true, user});
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occurred while searching for user."});
    });
}

exports.updateUser = (req, res) => {
    if(req.user.username !== req.params.username) return res.status(401).json({success: false, message: "You are not allowed to perform this action."});
    User.findOne({username: req.params.username}).then(user => {
        if(!user) return res.status(404).json({success: false, message: "User not found."});
        //update user info if new values are provided
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.title = req.body.title || user.title;
        user.skills = req.body.skills || user.skills;
        user.github = req.body.github
        user.portfolio = req.body.portfolio || user.portfolio;
        user.newUser = req.body.newUser || user.newUser;

        user.save().then(user => {
            res.status(201).json({success: true, user, message: "Your account details were updated!"});
        }).catch(err => {
            res.status(500).json({success: false, err, message: "An error occurred while updating account details."});
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({success: false, err, message: "An error occurred while updating account details."});
    });
}

module.exports = exports;