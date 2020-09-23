const Comment = require('./utils/comment');

const updateComment = async (req, res) => {
  const comment = await Comment.add(req.user._id, req.body);
  res.json(comment);
};

module.exports = { updateComment };
