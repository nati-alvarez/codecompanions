const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    admin: {type: Boolean, default: false},
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    profilePicture: {type: String, default: "https://avatars2.githubusercontent.com/u/265631?s=88&v=4"},
    password: {type: String, required: true},
    verified: {type: Number, default: 0},
    verificationCode: String,
    newUser: {type: Number, default: 1},
    title: String,
    bio: String,
    skills: [String],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    github: {username: String, accountPage: String},
    portfolio: String
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;