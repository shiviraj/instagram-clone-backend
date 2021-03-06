const Post = require('./utils/post');
const User = require('./utils/user');
const { moveMedia } = require('./media');

const serveNewsFeeds = async (_req, res) => {
  const newsFeed = await Post.getNewsFeeds();
  res.send(newsFeed);
};

const servePost = async (req, res) => {
  const post = await Post.getPost(req.params.id);
  res.json(post);
};

const toggleLike = async (req, res) => {
  const post = await Post.toggleLike(req.params.id, req.user._id);
  res.json(post.likes);
};

const serveUsersPost = async (req, res) => {
  const { _id } = await User.findByUsername(req.params.username);
  const posts = await Post.usersPost(_id);
  res.json(posts);
};

const uploadPost = async (req, res) => {
  moveMedia(req.body.media);
  const post = await Post.upload(req.body, req.user);
  res.json(post);
};

module.exports = {
  serveNewsFeeds,
  servePost,
  toggleLike,
  serveUsersPost,
  uploadPost,
};
