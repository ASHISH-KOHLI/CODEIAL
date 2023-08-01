const Post = require('../models/post');

// a controller is a set of different actions

// Assuming you have already imported the required modules and models

module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).populate('user').exec();

        return res.render('home', {
            title: 'home',
            posts: posts
        });
    } catch (err) {
        // Handle any potential errors here
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};


// module.exports.actionName = function(req,res){}