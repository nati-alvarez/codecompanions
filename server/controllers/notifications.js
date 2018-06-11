//models
const ProjectInvitation = require("../models/ProjectInvitation");

exports.getNotifications = async (req, res) => {
    ProjectInvitation.find({recipient: req.user._id})
    .populate('recipient', 'username profilePicture')
    .populate('project')
    .populate({
        path: "project",
        populate: {
            path: "owner",
            model: "User",
            select: "username profilePicture"
        }
    })
    .then(invitations=>{
        res.status(200).json({success: true, notifications: invitations});
    }).catch(err=>{
        console.log(err)
    });
}

module.exports = exports;