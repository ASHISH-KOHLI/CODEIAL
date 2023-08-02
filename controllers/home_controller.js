const Post = require('../models/post');
const User = require('../models/user');
// a controller is a set of different actions


module.exports.home = async function (req, res) {
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

        const users = await User.find({}).exec();

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error fetching data:', err);
        return res.redirect('/');
    }
};



// module.exports.actionName = function(req,res){}