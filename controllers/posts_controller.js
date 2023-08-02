const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post) => {
        return res.redirect('back');
    })
    .catch((err) => {
        console.log('Error in creating a post:', err);
        return res.status(500).send('Internal Server Error');
    });
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


module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .exec()
        .then(post => {
            if (!post) {
                return res.redirect('back');
            }

            if (post.user.toString() !== req.user.id) {
                return res.redirect('back');
            }

            return Promise.all([
                post.deleteOne(), // or post.deleteMany() for multiple posts
                Comment.deleteMany({ post: req.params.id }).exec()
            ]);
        })
        .then(() => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log('Error deleting post:', err);
            return res.redirect('back');
        });
};
