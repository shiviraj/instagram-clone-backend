const Post = require('./utils/post');

const serveNewsFeeds = async (_req, res) => {
  const newsFeed = await Post.getNewsFeeds();
  res.send(newsFeed);
};

const toggleLike = async (req, res) => {
  const post = await Post.toggleLike(req.params.id, req.user._id);
  res.json(post.likes);
};

const serveAuthorsPost = async (req, res) => {
  const posts = await Post.authorsPost(req.user._id);
  res.json(posts);
};

module.exports = { serveNewsFeeds, toggleLike, serveAuthorsPost };
