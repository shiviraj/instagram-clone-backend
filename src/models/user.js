const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true },
  avatar: { type: String },
  createdAt: { type: Number, default: new Date() },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tokens: [{ token: { type: String } }],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const { SECRET_CODE } = process.env;
  const options = { _id: user._id.toString() };
  const token = jwt.sign(options, SECRET_CODE, { expiresIn: '30 days' });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await Author.findOne({ email });
  if (!user) throw new Error('Unable to login');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');
  return user;
};

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'postBy',
});

module.exports = mongoose.model('User', userSchema);
