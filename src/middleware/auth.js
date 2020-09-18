const User = require('../models/user');

const auth = async (req, res, next) => {
  const user = await User.findOne({ username: 'shiviraj' });
  req.user = user;
  next();
};

module.exports = auth;
