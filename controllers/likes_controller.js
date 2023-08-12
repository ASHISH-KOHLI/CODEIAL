const Like = require('../models/like');
const Post = require('../models/post')
const Comment = require("../models/comment");




module.exports.toogleLike = async function(req,res){
    try{
           
    // likes/toofle/?id=abcdef&type= Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
           
        }

    // check if the existing like already exists
    let existingLike = await  Like.findOne({
        likeable: req.query.id,
        onModel : req.query.type,
        user: req.user._id
    })
    
    // if a like already exists
    if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.remove();
        deketed = true;
    }else{
        // else make a new like
        let newLike = await Like.create({
            user: req.user._id,
            onModel:req.query.type
        });
        likeable.likes.push(like._id);
        likeable.save();
    }
        
    return res.json(200,{
        message :"Request Sucessful",
        data: {
            deleted : deleted
        }
    })

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
}