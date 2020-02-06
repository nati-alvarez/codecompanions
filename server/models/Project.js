const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    listing: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectListing"},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
    channels: [{type: mongoose.Schema.Types.ObjectId, ref: "Channel"}],
    title: {type: String, requried: true},
    description: String,
    repo: String,
}, {timestamps: true});

//************ NOTE TO SELF *********************//
//.pre and .post methods WILL NOT WORK if it is called
//AFTER the model is compiled


//create general chat channel before the project is saved
const Channel = require("./Channel");

ProjectSchema.post("save", function(project, next){
    console.log("creating the general chat");
    var generalChannel = new Channel({
        project: this._id,
        name: "General"
    });

    Channel.findOne({project: project._id, name: "General"}).then(channel=>{
        if(channel) return next();
        else{
            generalChannel.save().then(channel=>{
                //adding general channel to project channel list
                Project.findOneAndUpdate({_id: project._id}, {$push: {channels: channel._id}}).then(data=>{
                    next();
                }).catch(err=>{
                    console.log(err);
                });
            }).catch(err=>{
                console.log(err);
            });
        }
    });
});

const Project = mongoose.model("Project", ProjectSchema);


module.exports = Project;