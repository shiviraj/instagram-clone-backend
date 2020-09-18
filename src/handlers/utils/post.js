const User = require('../../models/user');
const Post = require('../../models/post');

const getNewsFeeds = async () => {
  return await Post.find({})
    .populate('postBy', ['name', 'username', 'avatar'])
    .sort({ postAt: -1 });
};

const toggleUserLike = (post, userID) => {
  const isLiked = post.likes.find((id) => id.equals(userID));
  if (isLiked) {
    return post.likes.filter((id) => !id.equals(userID));
  }
  return post.likes.concat(userID);
};

const toggleLike = async (postID, userID) => {
  const post = await Post.findById(postID);
  post.likes = toggleUserLike(post, userID);
  return await post.save();
};

module.exports = { getNewsFeeds, toggleLike };
