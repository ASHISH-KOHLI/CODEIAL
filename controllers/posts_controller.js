const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')



module.exports.create = async function(req, res) {
  try {
      let post = await Post.create({
          content: req.body.content,
          user: req.user._id
      });
      
      if (req.xhr) {
          // If we want to populate just the name of the user (without sending the password in the API)
          post = await post.populate('user', 'name')

          return res.status(200).json({
              data: {
                  post: post
              },
              message: "Post created!"
          });
      }

      req.flash('success', 'Post published!');
      return res.redirect('back');

  } catch (err) {
      req.flash('error', err.message);
      console.error(err);
      return res.redirect('back');
  }
}



module.exports.destroy = async function(req, res) {
  try {
      const post = await Post.findById(req.params.id);

      if (!post) {
          req.flash('error', 'Post not found');
          return res.redirect('back');
      }

      if (post.user.toString() !== req.user._id.toString()) {
          req.flash('error', 'You cannot delete this post!');
          return res.redirect('back');
      }

      // Delete associated likes for the post
      await Like.deleteMany({ likeable: post, onModel: 'Post' });

      // Delete likes associated with the post's comments
      await Like.deleteMany({ _id: { $in: post.comments } });

      // Delete comments associated with the post
      await Comment.deleteMany({ post: req.params.id });

      // Remove the post
      await post.deleteOne();

      if (req.xhr) {
          return res.status(200).json({
              data: {
                  post_id: req.params.id
              },
              message: "Post deleted"
          });
      }

      req.flash('success', 'Post and associated comments deleted!');
      return res.redirect('back');
  } catch (err) {
      req.flash('error', err.message);
      console.error(err);
      return res.redirect('back');
  }
};
