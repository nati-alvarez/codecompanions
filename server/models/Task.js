const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    name: {type: String, required: true},
    description: {type: String, required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    status: {type: Number, default: 0} //0 is in progress, 1 is pending review, 2 is completed
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;