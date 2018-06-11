const ProjectInvitation = require("../models/ProjectInvitation");
const Project = require("../models/Project");

exports.getInvitation = (req, res) => {
    ProjectInvitation.findById(req.params.id)
    .populate('project')
    .populate('recipient', 'username,profilePicture')
    .populate({
        path: "project",
        populate: {
            path: "owner",
            model: "User",
            select: ['username', 'profilePicture']
        }
    })
    .populate({
        path: "project",
        populate: {
            path: "members",
            model: "User",
            select: ["username", "profilePicture"]
        }
    })
    .then(invitation=>{
        res.status(200).json({success: true, invitation});
    }).catch(err=>{
        res.status(500).json({success: false, message: "Error getting invitation"});
        console.log(err);
    });
}

exports.acceptInvitation = (req, res) => {
    ProjectInvitation.findById(req.body.id).then(invitation=>{
        if(!invitation)
            return res.status(404).json({success: false, message: "Invitation not found"});

        Project.findByIdAndUpdate(invitation.project, {"$push": {"members": invitation.recipient}}).then(project=>{
            invitation.status = 1;
            invitation.save().then(invitation=>{
                return res.status(200).json({success: true, invitation, message: "Invitation accepted"});
            }).catch(err=>{
                res.status(500).json({success: false, message: "Error accpeting invitation", err});
            });
        }).catch(err=>{
            res.status(500).json({success: false, message: "Error accpeting invitation", err});
        })

    }).catch(err=>{
        res.status(500).json({success: false, message: "Error accpeting invitation", err});
    });
} 


exports.declineInvitation = (req, res) => {
    console.log('ok');
    res.send("deleting")
}

module.exports = exports;