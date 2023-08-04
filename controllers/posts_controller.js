const Post = require('../models/post')
const Comment = require('../models/comment')

// module.exports.create = function (req, res) {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     })
//     .then((post) => {
//         return res.redirect('back');
//     })
//     .catch((err) => {
//         console.log('Error in creating a post:', err);
//         return res.status(500).send('Internal Server Error');
//     });
// };

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"post created"
            });
        }
        req.flash('success','post published')
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err)
        return res.redirect('back');
    }
};



// module.exports.destroy = function(req, res){
//    Post.findById(req.params.id, function(err, post){
// //.id means converting the object id into strings
//     if(post.user == req.user.id){
//         post.remove();

//         Comment.deleteMany({post: req.params.id},function(err){
//                return res.redirect('back');
//         });
//     }else{
//         return res.redirect('back');
//     }
//    });
// }


// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id)
//         .exec()
//         .then(post => {
//             if (!post) {
//                 return res.redirect('back');
//             }

//             if (post.user.toString() !== req.user.id) {
//                 return res.redirect('back');
//             }

//             return Promise.all([
//                 post.deleteOne(), // or post.deleteMany() for multiple posts
//                 Comment.deleteMany({ post: req.params.id }).exec()
//             ]);
//         })
//         .then(() => {
//             return res.redirect('back');
//         })
//         .catch(err => {
//             console.log('Error deleting post:', err);
//             return res.redirect('back');
//         });
// };
module.exports.destroy = async function(req, res)
{
    try
    {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if(comment.user == req.user.id ||  post.user == req.user.id)
        {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success', 'Comment Removed');
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}