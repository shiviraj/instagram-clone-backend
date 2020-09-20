const User = require('../../models/user');

const signUp = async (user) => {
  return await new User(user).save();
};

const signIn = async ({ email, password }) => {
  return await User.findByCredentials(email, password);
};

module.exports = { signUp, signIn };
