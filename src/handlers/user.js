const User = require('./utils/user');

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

module.exports = {
  signUpUser,
  signInUser,
  serveUser,
  serveClientID,
  signInOAuth,
};
