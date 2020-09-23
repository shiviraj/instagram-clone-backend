const Comment = require('../../models/comments');

const add = async (userID, { comment: msg, postID: post }) => {
  const newComment = new Comment({ commentBy: userID, msg, post });
  const comment = await newComment.save();
  return await comment.populate('commentBy', '_id username').execPopulate();
};

const getAll = async () => {
  return await Comment.find({}).populate('commentBy', '_id username');
};

const getByPostId = async (postID) => {
  return await Comment.find({ post: postID }).populate(
    'commentBy',
    '_id username'
  );
};

module.exports = { add, getAll, getByPostId };
