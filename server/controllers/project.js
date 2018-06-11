const router = require("express").Router();

//MODELS
const User = require("../models/User");
const Project = require("../models/Project");
const ProjectListing = require("../models/ProjectListing");
const Channel = require("../models/Channel");
const Task = require("../models/Task");
const ProjectInvitation = require("../models/ProjectInvitation");

exports.createProject = async (req, res) => {
    var newProjectListing = new ProjectListing({
        owner: req.user._id,
        title: req.body.projectListingTitle,
        description: req.body.projectListingDescription,
        skills: req.body.skills || []
    });

    //creates project listing and returns it for project schema to use
    var newListing;
    if(req.body.public === 1) {
        try{
            newListing = await newProjectListing.save();
        }catch(err){
            console.log(err);
            newListing = {};
        }
    }
    
    var newProject = new Project({
        owner: req.user._id,
        members: [req.user._id],
        title: req.body.projectTitle,
        listing: (req.body.public === 1)? newListing._id: null, //only create the project listing if public is set to 1 in req.body
        description: req.body.projectDescription,
        repo: req.body.githubRepo
    });     

    newProject.save().then(project => {
        res.status(201).json({success: true, message: "Project created."});
    }).catch(err => {
        res.status(500).json({success: false, message: "Error creating project.", err});
    });
}

//gets all projects where the user is a member
//used for myProjects page on site
exports.getMyProjects = (req, res) => {
    Project.find({members: req.user._id})
    .populate('owner',['username', 'name', 'profilePicture']).then(projects => {
        res.status(200).json({success: true, projects});
    }).catch(err => {
        res.status(500).json({success: false, err, message: "Error getting projects."});
    });
}

exports.getProject = (req, res) => {
    Project.findOne({_id: req.params.id})
    .populate("members", ["username", "name", "email", "profilePicture", "github", "title", "_id"])
    .populate("owner", ["username", "name", "email", "profilePicture", "github", "title", "_id"])
    .populate("channels")
    .populate({path: "tasks", options: {sort: {status: 1, createdAt: -1}}})
    .then(project => {
        //populate nested refs to users in task
        project.populate({path: "tasks.users",select: {username: 1, profilePicture: 1}, model: "User"}, function(err, project){
            if(err) return res.status(500).json({success: false, err, message: "Error getting project data"});
            if(!project) return res.status(404).json({success: false, message: "Project not found."});
            res.status(200).json({success: true, project}); 
        })
    }).catch(err => {
        res.status(500).json({success: false, err, message: "Error getting project data"})
        console.log(err);
    });
}

/*****************************
 * 
 * PROJECT INVITATION FUNCTIONS
 *
*****************************/
exports.sendProjectInvitation = async (req, res) => {
    var user;
    try{
        user = await User.findOne({username: req.body.recipient});
        if(!user) return res.status(200).json({success: false, message: "User not found"});
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "Error sending project invitation"});
    }

    var project;
    try{
        project = await Project.findOne({_id: req.body.project}).lean();

        //using toString on the ids because for some reason when I compare them normally
        //they are not equal to one another no matter what even if they are the exact same id
        //will fix later
        if(req.user._id.toString() != project.owner.toString())
            return res.status(200).json({success: false, message: "Only the project owner can send invites"});
        if(project.members.indexOf(user._id) >= 0)
            return res.status(500).json({success: false, message: "This user is already a project member"});

    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "Error sending project invitation"});
    }

    var invitation = new ProjectInvitation({
        project: req.body.project,
        recipient: user._id,
    });

    console.log("what the fuck");

    invitation.save().then(invitation=>{
        res.status(201).json({success: true, invitation, message: "Project invitation sent"});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({success: false, message: "Error sending project invitation"});
    })
}



/********************* 
 * 
 * PROJECT CHANNELS FUNCTIONS
 *
*********************/
exports.sendMessage = async (req, res) => {
    var message = {
        body: req.body.messageBody,
        author: {
            username: req.user.username,
            profilePicture: req.user.profilePicture
        }
    }
    
    //check if user is allowed to post in channel
    var isAuthorized;
    try {
        isAuthorized = Project.find({_id: req.params.id, members: req.user._id});
        if(!isAuthorized) return res.status(401).json({success: false, message: "You are not authorized to do this"});
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "An error occurred sending message", err});
    }

    Channel.updateOne({name: req.body.channelName, project: req.params.id}, {$push: {messages: message}}).then(channel =>{
        res.status(201).json({success: true, message: message});
    }).catch(err=>{
        console.log(err)
        res.status(500).json({success:false, message: "Error sending message", err});
    });
}

exports.createTextChannel = async (req, res)=>{
    //check if channel with same name already exists
    var channelExists;
    try{
        channelExists = await Channel.findOne({name: req.body.channelName, project: req.params.id})
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: "An error occurred creating channel", err})
    }

    if(channelExists) return res.status(500).json({success: false, message: "This channel already exists"});

    //if not, create new channel
    var channel = new Channel({
        name: req.body.channelName,
        project: req.params.id
    });

    channel.save().then(newChannel=>{
        //push newly created channel to list of channels in correct project
        Project.findOneAndUpdate({_id: req.params.id}, {$push: {channels: newChannel._id}}).then(project=>{
            res.status(201).json({success: true, channel});
        }).catch(err=>{
            res.status(500).json({success: false, message: "An error occurred creating channel", err})            
        })
    }).catch(err=>{
        res.status(500).json({success: false, message: "An error occurred creating channel", err})
    })
}

/************************************
 * 
 * PROJECT TASK FUNCTIONS
 * 
************************************/
exports.createTask = async (req, res) => {
    //Check if user has permission to create tasks
    var isAuthorized;

    try{
        isAuthorized = await Project.findOne({_id: req.params.id, owner: req.user._id});
        if(!isAuthorized) return res.status(401).json({success: false, message: "You are not authorized to do that"})
    }catch(err){
        return res.status(500).json({sucess: false, message: "Error creating task", err});
    }

    var task = new Task({
        project: req.params.id,
        name: req.body.taskName,
        description: req.body.taskDescription,
        users: req.body.taskUsers
    });

    task.save().then(task=>{
        Project.findOneAndUpdate({_id: req.params.id}, {$push: {tasks: task._id}}).then(project=>{
            task.populate({path: "users", select: {username: 1, profilePicture: 1}, model: "User"}, function(err, task){
                if(err){
                    console.log(err);
                    return res.status(500).json({success: false, message: "Error creating task", err});
                }
                res.status(201).json({success: true, task});
            });
        }).catch(err=>{
            console.log(err);
            return res.status(500).json({sucess: false, message: "Error creating task", err});
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({sucess: false, message: "Error creating task", err});
    });
}

exports.completeTask = (req, res) => {
    Task.findById(req.body.taskId).then(task=>{
        if(task.users.indexOf(req.user._id > -1)){
            task.status = 2;
            task.save().then(task=>{
                task.populate({path: "users", select: {username: 1, profilePicture: 1}, model: "User"}, function(err, task){
                    if(err){
                        console.log(err)
                        return res.status(500).json({success: false, message: "Error updating task", err});
                    }
                    res.status(200).json({success: true, task});
                })
            }).catch(err=>{
                console.log(err);
                res.status(500).json({success: false, message: "Error updating task", err});
            })
        }else {
            res.status(401).json({success: false, message: "You are not authorized to do this"});
        }
    }).catch(err=>{
        res.status(500).json({success: false, message: "Error updating task", err});
    });
}

module.exports = exports;