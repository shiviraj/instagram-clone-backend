const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  msg: { type: String },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  commentAt: { type: Number, default: new Date() },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
