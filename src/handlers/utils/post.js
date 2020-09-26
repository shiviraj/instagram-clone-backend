const Post = require('../../models/post');
const Comment = require('./comment');

const mergeComments = (posts, comments) => {
  const allComments = comments.reduce((result, comment) => {
    if (!result[comment.post]) result[comment.post] = [];
    result[comment.post].push(comment);
    return result;
  }, {});
  return posts.map((post) => {
    if (allComments[post._id]) post.comments = allComments[post._id];
    return post;
  });
};

const getNewsFeeds = async () => {
  const posts = await Post.find({})
    .populate('postBy', ['name', 'username', 'avatar'])
    .sort({ postAt: -1 });
  const allComments = await Comment.getAll();
  return mergeComments(posts, allComments);
};

const getPost = async (id) => {
  const post = await Post.findById(id).populate(
    'postBy',
    'name username avatar'
  );
  const comments = await Comment.getByPostId(id);
  return Object.assign(post, { comments });
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
  return await new Post(post).save();
};

module.exports = { getNewsFeeds, toggleLike, usersPost, upload, getPost };
