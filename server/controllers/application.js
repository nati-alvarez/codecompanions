const Application = require("../models/Application");
const Project = require("../models/Project");

exports.replyToApplication = async (req, res) =>{
    if(req.body.accept === true){
        var application;

        try {
            application = await Application.findOne({_id: req.params.id});
        } catch(err){
            console.log(err);
            return res.status(500).json({success: false, message: "Error replying to application.", err});
        }

        var alreadyMember;
        //check if applicant is already a member of the project
        try{
            alreadyMember = await Project.findOne({members: application.applicant._id});
            if(alreadyMember) return res.status(200).json({success: false, message:  "You are already a member"});
        }catch(err){
            console.log(err);
            return res.status(500).json({success: false, message: "Error replying to application.", err}); 
        }


        Project.findOneAndUpdate({listing: application.projectListingId}, {"$push": {"members": application.applicant}}).then(project => {
            application.set({status: 1});
            
            application.save().catch(err => {
                return res.status(500).json({success: false, message: "Error replying to application.", err});
            });
            project.save().catch(err => {
                return res.status(500).json({success: false, message: "Error replying to application.", err});
            });
            res.status(200).json({success: true, message: "Application accepted!", application});
        }).catch(err => {
            return res.status(500).json({success: false, message: "Error replying to application.", err});
        });
    }else{
        Application.findOneAndUpdate({_id: req.params.id}, {$set: {status: 2}}).then(data=>{
            res.status(200).json({success: true, message: "Application declined."});
        }).catch(err=>{
            res.status(500).json({success: false, message: "Error replying to application", err});
        })
    }
}

module.exports = exports;