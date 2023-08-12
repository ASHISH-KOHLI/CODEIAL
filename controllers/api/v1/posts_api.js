const Post = require("../../../models/post")
const Comment = require("../../../models/comment")

module.exports.index = async function(req,res){
   
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
   
   
   
    return res.json(200,{
        message:"list of posts ",
        posts:posts 
    })
}



module.exports.destroy = async function(req, res) {
    try {
        const postId = req.params.id;

        // Delete the post using deleteOne
        const deleteResult = await Post.deleteOne({ _id: postId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // Delete associated comments
        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            message: 'Post and associated comments deleted successfully'
        });
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
