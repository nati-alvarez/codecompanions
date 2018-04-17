const mongoose = require("mongoose");

const ProjectListingSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: [{type: String, required: true}],
    open: {type: Boolean, default: true, requried: true}
}, {timestamps: true});

const ProjectListing = mongoose.model('ProjectListing', ProjectListingSchema);

module.exports = ProjectListing;