const User = require("../models/User");

//for finding users that exists when creating a project invitation
exports.getUsers = (req, res) => {
    if(!req.body.username)
        return res.status(200).json({success: true, users: []});
    User.find({username: new RegExp('^' + req.body.username, "i")}).limit(5).then(users=>{
        console.log(users);
        return res.status(200).json({success: true, users});
    });
}

exports.getUser = (req, res) => {
    User.findOne({username: req.params.username}).then(user => {
        if (!user) return res.status(404).json({success: false, message: "User not found."});
        res.status(200).json({success: true, user});
    }).catch(err => {
        res.status(500).json({success: false, err, message: "An error occurred while searching for user."});
    });
}

module.exports = exports;

exports.updateUser = (req, res) => {
    if(req.user.username !== req.params.username) return res.status(401).json({success: false, message: "You are not allowed to perform this action."});
    User.findOne({username: req.params.username}).then(user => {
        if(!user) return res.status(404).json({success: false, message: "User not found."});
        //update user info if new values are provided
        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.bio = req.body.bio || user.bio;
        user.title = req.body.title || user.title;
        user.skills = req.body.skills || user.skills;
        if(req.body.github){
            user.github.username = req.body.github.username || user.github.username
            user.github.accountPage = req.body.github.accountPage || user.github.accountPage
        }
        user.portfolio = req.body.portfolio || user.portfolio;
        user.newUser = req.body.newUser || user.newUser;

        user.save().then(user => {
            console.log(user)
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