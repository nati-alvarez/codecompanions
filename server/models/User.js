const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verified: {type: Number, default: 0},
    verificationCode: String,
    newUser: {type: Number, default: 1},
    title: String,
    skills: [String],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    github: {username: String, accountPage: String},
    portfolio: String
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;