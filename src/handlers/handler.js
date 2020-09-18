const Post = require('./utils/post');

const serveNewsFeeds = async (_req, res) => {
  const newsFeed = await Post.getNewsFeeds();
  res.send(newsFeed);
};

module.exports = { serveNewsFeeds };
