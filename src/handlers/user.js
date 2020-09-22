const User = require('./utils/user');
const Media = require('./media');

const signUpUser = async (req, res) => {
  try {
    const user = await User.signUp(req.body);
    const token = await user.generateAuthToken();
    Object.assign(user, { password: null, tokens: [] });
    res.cookie('token', token).status(201).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

const signInUser = async (req, res) => {
  try {
    const user = await User.signIn(req.body);
    const token = await user.generateAuthToken();
    Object.assign(user, { password: null, tokens: [] });
    res.cookie('token', token).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

const serveUser = async (req, res) => {
  const user = await User.findByUsername(req.params.username);
  res.json(user);
};

const serveClientID = (_req, res) => {
  res.send({ clientID: process.env.CLIENT_ID });
};

const signInOAuth = async (req, res) => {
  try {
    const user = await User.signInOAuth(req.params.code);
    const token = await user.generateAuthToken();
    Object.assign(user, { password: null, tokens: [] });
    res.cookie('token', token).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateProfile = async (req, res) => {
  const user = await User.updateProfile(req.user._id, req.body);
  res.json(user);
};

const updatePassword = async (req, res) => {
  const user = await User.updatePassword(req.user._id, req.body);
  res.json(user);
};

const updateAvatar = async (req, res) => {
  const avatar = await Media.uploadAvatar(req.file);
  const user = await User.updateAvatar(req.user._id, avatar);
  res.json(user);
};

module.exports = {
  signUpUser,
  signInUser,
  serveUser,
  serveClientID,
  signInOAuth,
  updateProfile,
  updatePassword,
  updateAvatar,
};
