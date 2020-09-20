const Post = require('./utils/post');
const User = require('./utils/user');

const serveNewsFeeds = async (_req, res) => {
  const newsFeed = await Post.getNewsFeeds();
  res.send(newsFeed);
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

module.exports = { serveNewsFeeds, toggleLike, serveUsersPost };
