const Post = require('../models/post');
const User = require('../models/user');
// a controller is a set of different actions


// module.exports.home = async function (req, res) {
//     try {
//         const posts = await Post.find({})
//             .sort('-createdAt')
//             .populate('user')
//             .populate({
//                 path: 'comments',
//                 populate: {
//                     path: 'user'
//                 },
//                 populate:{
//                     path:'likes'
//                 }
//             })
//             .exec();

//         const users = await User.find({}).exec();

//         return res.render('home', {
//             title: 'Codeial | Home',
//             posts: posts,
//             all_users: users
//         });
//     } catch (err) {
//         console.log('Error fetching data:', err);
//         return res.redirect('/');
//     }
// };
module.exports.home = async function(req, res){

    try{
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate ({
            path: 'comments',
            populate:
            {
                path: 'user'
            }
        })
        .populate
        ({
            path: 'comments',
            populate:
            {
                path: 'likes'
            }
        })
        .populate('likes');

    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}


// module.exports.actionName = function(req,res){}