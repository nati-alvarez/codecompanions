const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    projectListingId: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectListing", required: true},
    applicant: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    body: {type: String, required: true},
    status: {type: Number, default: 0} //0 means pending response, 1 accepted, 2 declined
}, {timestamps: true});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;