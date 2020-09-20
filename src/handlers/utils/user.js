const User = require('../../models/user');

const signUp = async (user) => {
  return await new User(user).save();
};

const signIn = async ({ email, password }) => {
  return await User.findByCredentials(email, password);
};

const findByUsername = async (username) => {
  const select = 'name;username;avatar;_id;following;followers'.split(';');
  return await User.findOne({ username }).select(select);
};

module.exports = { signUp, signIn, findByUsername };
