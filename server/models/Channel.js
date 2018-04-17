const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
    name: {type: String, requried: true},
    messages: [{
        body: {type: String, required: true},
        author: {username: String, profilePicture: String}
    }],
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project"}
})

const Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;