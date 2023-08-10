const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer')
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker')
// Assuming you have already imported the required modules and models



module.exports.create = function(req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (!post) {
                throw new Error('Post not found');
            }

            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment => {
                post.comments.push(comment);
                return post.save();
            })
            .then(() => {
                return Comment.findById(comment._id).populate('user', 'name email');
            })
            .then(populatedComment => {
                comment = populatedComment;
                const job = queue.create('emails', comment);
                return job.save();
            })
            .then(() => {
                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment created"
                    });
                }

                req.flash('success', 'Comment Added');
                return res.redirect('back');
            })
            .catch(err => {
                req.flash('error', err.message || 'An error occurred');
                return res.redirect('back');
            });
        })
        .catch(err => {
            req.flash('error', err.message || 'An error occurred');
            return res.redirect('back');
        });
}








// module.exports.create = function (req, res) {
//     Post.findById(req.body.post)
//         .then(post => {
//             if (!post) {
//                 console.log('Post not found');
//                 return res.redirect('/');
//             }

//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             })
//                 .then(comment => {
//                     post.comments.push(comment);
//                     return post.save();
//                 })
//                 .then(() => {
//                     commentsMailer.newComment(comment);
//                     res.redirect('/');
//                 })
//                 .catch(err => {
//                     console.log('Error in posting comment:', err);
//                     res.redirect('/');
//                 });
//         })
//         .catch(err => {
//             console.log('Error finding post:', err);
//             res.redirect('/');
// });
// };






// module.exports.create = function (req, res) {
//     Post.findById(req.body.post)
//         .then(post => {
//             if (!post) {
//                 console.log('Post not found');
//                 return res.redirect('/');
//             }

//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             })
//                 .then(comment => {
//                     // Capture the created comment
//                     post.comments.push(comment);

//                     // Save the post with the new comment
//                     return post.save().then(() => comment);
//                 })
//                 .then(comment => {
//                     // Call the commentsMailer function with the captured comment
//                     commentsMailer.newComment(comment);

//                     res.redirect('/');
//                 })
//                 .catch(err => {
//                     console.log('Error in posting comment:', err);
//                     res.redirect('/');
//                 });
//         })
//         .catch(err => {
//             console.log('Error finding post:', err);
//             res.redirect('/');
//         });
// };





module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id).exec();

        if (!comment) {
            return res.redirect('back');
        }

        if (comment.user.toString() !== req.user.id) {
            return res.redirect('back');
        }

        let postId = comment.post;
        await comment.deleteOne();

        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();

        return res.redirect('back');
    } catch (err) {
        console.log('Error deleting comment:', err);
        return res.redirect('back');
    }
};