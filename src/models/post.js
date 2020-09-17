const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, trim: true },
  photos: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  postAt: { type: Number, default: new Date() },
});

module.exports = mongoose.model('Post', postSchema);
