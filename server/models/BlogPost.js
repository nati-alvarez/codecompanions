const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {type: String, requried: true, unique: true},
    bannerImage: {type: String, required: true},
    body: {type: String, required: true},
    tagline: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    views: {type: Number, default: 0},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema)

module.exports = BlogPost;