const mongoose = require("mongoose");

const ProjectInvitationSchema = new mongoose.Schema({
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true}, //will get sender from project owner; only owner can send invites
    status: {type: Number, default: 0}, //0 pending, 1 accepted, 2 declined
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});  

const ProjectInvitation = mongoose.model("ProjectInvitation", ProjectInvitationSchema);

module.exports = ProjectInvitation;