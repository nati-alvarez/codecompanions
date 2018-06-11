const BlogPost = require("../models/BlogPost");

exports.getAllPosts = function(req,res){
    BlogPost.find({}).sort({createdAt: -1}).populate('author', 'username name profilePicture').then(posts=>{
        return res.json({success: true, posts});
    }).catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: "An error occurred getting blog posts", err});
    })
}

exports.getPost = function(req, res){
    BlogPost.findById(req.params.id)
    .populate('author', 'username, profilePicture')
    .then(post=>{
        return res.json({success: true, post});
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({success: false, message: "An error occurred getting post", err});
    });
}

exports.updatePost = function(req, res){
    if(!req.user.admin)
        return res.status(401).json({success: false, message: "Unauthorized"});
    BlogPost.findById(req.params.id).then(post=>{
        post.body = req.body.body;
        post.title = req.body.title;
        post.tagline = req.body.tagline;
        post.bannerImage = req.body.bannerImage;
        post.save().then(post=>{
            return res.status(201).json({success: false, message: "Post updated", post});
        }).catch(err=>{
            console.log(err);
            return res.status(500).json({success: false, message: "An error occurred updating post", err});
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({success: false, message: "An error occurred updating post", err});
    });
}

exports.deletePost = function(req, res){
    if(!req.user.admin)
        return res.status(401).json({success: false, message: "Unauthorized"});

    BlogPost.findByIdAndRemove(req.params.id).then(post=>{
        return res.json({success: true, message: "Post Deleted", post});
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({success: false, message: "An error occurred deleting post", err});
    })
}

exports.createNewPost = function(req, res){
    if(!req.user.admin)
        return res.status(401).json({success: false, message: "Unauthorized"});
    
    var newPost = new BlogPost({
        title: req.body.title,
        bannerImage: req.body.bannerImage,
        body: req.body.body,
        tagline: req.body.tagline,
        author: req.user._id
    });

    newPost.save().then(post=>{
        return res.status(201).json({success: true, message: "Blog post created", post});
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({success: false, message: "An error occurred creating post", err});
    });
}

module.exports = exports;