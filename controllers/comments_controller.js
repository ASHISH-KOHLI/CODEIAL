const Comment = require('../models/comment');
const Post = require('../models/post');


// Assuming you have already imported the required modules and models

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (!post) {
                console.log('Post not found');
                return res.redirect('/');
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
                    res.redirect('/');
                })
                .catch(err => {
                    console.log('Error in posting comment:', err);
                    res.redirect('/');
                });
        })
        .catch(err => {
            console.log('Error finding post:', err);
            res.redirect('/');
        });
};

