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

const usersPost = async (userID) => {
  return await Post.find({ postBy: userID });
};

const upload = async ({ content, media }, { _id }) => {
  const post = Object.assign({ postBy: _id, content, photos: media });
  await new Post(post).save();
};

module.exports = { getNewsFeeds, toggleLike, usersPost, upload };
