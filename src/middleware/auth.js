const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async function (req, res, next) {
  try {
    const { token } = req.cookies;
    const { _id } = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findOne({ _id, 'tokens.token': token });
    Object.assign(req, { user, token });
    next();
  } catch (e) {
    res.sendStatus(401);
  }
};

module.exports = auth;
