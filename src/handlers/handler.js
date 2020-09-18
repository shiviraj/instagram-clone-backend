const Post = require('./utils/post');

const serveNewsFeeds = async (_req, res) => {
  const newsFeed = await Post.getNewsFeeds();
  res.send(newsFeed);
};

const toggleLike = async (req, res) => {
  const post = await Post.toggleLike(req.params.id, req.user._id);
  res.json(post.likes);
};

module.exports = { serveNewsFeeds, toggleLike };
