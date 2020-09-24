const User = require('../../models/user');
const { getAccessToken, getGithubUser } = require('./oauth');

const isAvailable = async (username) => {
  const user = await User.findOne({ username });
  return { result: !user };
};

const isAvailableEmail = async (email) => {
  const user = await User.findOne({ email });
  return { result: !user };
};

const signUp = async (user) => {
  return await new User(user).save();
};

const signIn = async ({ email, password }) => {
  return await User.findByCredentials(email, password);
};

const logout = async (userToken, user) => {
  user.tokens = user.tokens.filter(({ token }) => token !== userToken);
  return await user.save();
};

const findByUsername = async (username) => {
  const select = 'name;username;avatar;_id;following;followers'.split(';');
  return await User.findOne({ username }).select(select);
};

const findUsers = async (username) => {
  const select = 'name;username;avatar;_id;'.split(';');
  const regex = new RegExp(username);
  return await User.find({ username: regex }).select(select);
};

const signInOAuth = async (code) => {
  const { data } = await getAccessToken(code);
  const user = await getGithubUser(data.access_token);
  const userData = await User.findOne({ username: user.username });
  if (userData) return userData;
  const newUser = new User(user);
  return await newUser.save();
};

const updateProfile = async (id, profile) => {
  const user = await User.findById(id);
  Object.assign(user, profile);
  return await user.save();
};

const updatePassword = async (id, { pwd, oldPwd }) => {
  const user = await User.findById(id);
  const isPasswordExists =
    oldPwd && (await User.findByCredentials(user.email, oldPwd));
  if ((user.password && !oldPwd) || (oldPwd && !isPasswordExists)) {
    throw new Error('Old password is not match');
  }
  Object.assign(user, { password: pwd });
  return await user.save();
};

const updateAvatar = async (id, avatar) => {
  const user = await User.findById(id);
  Object.assign(user, { avatar });
  return await user.save();
};

module.exports = {
  isAvailable,
  isAvailableEmail,
  signUp,
  signIn,
  logout,
  findByUsername,
  findUsers,
  signInOAuth,
  updateProfile,
  updatePassword,
  updateAvatar,
};
