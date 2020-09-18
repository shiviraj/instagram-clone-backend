const User = require('../../models/user');
const Post = require('../../models/post');

const getNewsFeeds = async () => {
  return await Post.find({})
    .populate('postBy', ['name', 'username'])
    .sort({ postAt: -1 });
};

module.exports = { getNewsFeeds };
