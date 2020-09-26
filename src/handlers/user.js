const User = require('./utils/user');
const Media = require('./media');

const serveIsAvailable = async (req, res) => {
  const result = await User.isAvailable(req.body.username);
  res.json(result);
};

const serveIsAvailableEmail = async (req, res) => {
  const result = await User.isAvailableEmail(req.body.email);
  res.json(result);
};

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

const logoutUser = async (req, res) => {
  await User.logout(req.token, req.user);
  res.json({});
};

const serveUser = async (req, res) => {
  const user = await User.findByUsername(req.params.username);
  res.json(user);
};

const serveUsers = async (req, res) => {
  const users = await User.findUsers(req.params.username);
  res.json(users);
};

const serveClientID = (_req, res) => {
  res.send({ clientID: process.env.CLIENT_ID });
};

const signInOAuth = async (req, res) => {
  try {
    console.log(req.query.code);
    const user = await User.signInOAuth(req.query.code);
    const token = await user.generateAuthToken();
    Object.assign(user, { password: null, tokens: [] });
    res.cookie('token', token).redirect('/');
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
  serveIsAvailable,
  serveIsAvailableEmail,
  signUpUser,
  signInUser,
  logoutUser,
  serveUser,
  serveUsers,
  serveClientID,
  signInOAuth,
  updateProfile,
  updatePassword,
  updateAvatar,
};
