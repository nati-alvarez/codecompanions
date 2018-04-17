const router = require("express").Router();

const ProjectListings = require("../models/ProjectListing");
const Application = require("../models/Application");

exports.getProjectListings = (req, res) => {
    let query = {};
    let order = 1; //1 is asc, -1 is desc
     
    if(req.query.recommended === 'true'){
        query = {
            skills: {$in: req.user.skills}
        }
    }
    ProjectListings.find(query).sort({createdAt: -1})
    .populate('owner', ['username', 'profilePicture']).then(projectListings => {
        if(!projectListings[0]) return res.status(404).json({success: false, message: "No projects created yet."});
        res.status(200).json({success: true, projectListings});
    }).catch(err => {
        console.log(err)
        res.status(500).json({success: false, message: "Error getting project listings.", err});
    })
}

exports.searchProjectListings = (req, res) => {
    ProjectListings.find({title: new RegExp(req.body.title, "i")})
    .populate('owner', ['username', 'profilePicture']).then(projectListings => {
        if(!projectListings[0]) return res.status(404).json({success: false, message: "Nothing found."});
        res.status(200).json({success: true, projectListings});
    }).catch(err => {
        console.log(err)
        res.status(500).json({success: false, err, message: "Error getting search results."});
    });
}

exports.getProjectListing = async (req, res) => {
    var applications;
    
    try {
        applications = await Application.find({projectListingId: req.params.id}).where('status').ne(2)
        .populate("applicant", ["username", "name", "email", "profilePicture", "skills", "_id"]);
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, err, message: "Error getting project listing."});
    }
    
    //using lean method so I can add applications property to project listing object
    ProjectListings.findOne({_id: req.params.id}).lean()
    .populate('owner', ['username', 'name', 'profilePicture']).then(projectListing => {
        if(!projectListing) return res.status(404).json({success: false, message: "Project not found."});
        projectListing.applications = applications;
        res.status(200).json({success: true, projectListing});
    }).catch(err => {
        console.log(err);
        res.status(500).json({success: false, message: "Error getting project listing.", err});
    });
}

exports.apply = (req, res) => {
    var application = new Application({
        projectListingId: req.params.id,
        applicant: req.user._id,
        body: req.body.message
    });

    application.save().then(newApplication => {
        //getting user data from passport bc can't populate fields on creation in mongoose
        //using Object.create so that fields removed from userObject var aren't removed from
        //passport object
        var userObject = Object.create(req.user);
        userObject = JSON.parse(JSON.stringify(userObject));
        delete userObject.password;
        delete userObject.verificationCode;

        newApplication = newApplication.toObject();
        newApplication.applicant = userObject;
        res.status(201).json({success: true, message: "Your application was submitted.", newApplication});
    }).catch(err => {
        console.log(err);
        res.status(500).json({success: false, message: "Error creating application.", err});
    });
}

module.exports = exports;