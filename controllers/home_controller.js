const Post = require('../models/post');

// a controller is a set of different actions


module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts
        });
    } catch (err) {
        console.log('Error fetching posts:', err);
        return res.redirect('/');
    }
};



// module.exports.actionName = function(req,res){}