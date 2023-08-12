const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer')
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker')
// Assuming you have already imported the required modules and models


module.exports.create = function(req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (post) {
                return Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
            }
        })
        .then(comment => {
            if (comment) {
                const postId = comment.post;
                return Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true });
            }
        })
        .then(updatedPost => {
            if (updatedPost) {
                return Comment.populate(comment, { path: 'user', select: 'name email' });
            }
        })
        .then(populatedComment => {
            if (populatedComment) {
                const job = queue.create('emails', populatedComment).save();
                
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment: populatedComment
                        },
                        message: "Comment created!"
                    });
                }

                req.flash('success', 'Comment published!');
                res.redirect('/');
            }
        })
        .catch(err => {
            req.flash('error', err.message);
            console.error(err);
            return res.redirect('back');
        });
};

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

// module.exports.destroy = async function (req, res) {
//     try {
//         const comment = await Comment.findById(req.params.id).exec();

//         if (!comment) {
//             return res.redirect('back');
//         }

//         if (comment.user.toString() !== req.user.id) {
//             return res.redirect('back');
//         }

//         let postId = comment.post;
//         await comment.deleteOne();

//         await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
//         await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
//         return res.redirect('back');
//     } catch (err) {
//         console.log('Error deleting comment:', err);
//         return res.redirect('back');
//     }
// };