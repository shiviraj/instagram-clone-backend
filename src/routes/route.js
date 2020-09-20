const express = require('express');
const auth = require('../middleware/auth');

const { signUpUser, signInUser, serveUser } = require('../handlers/user');

const {
  serveNewsFeeds,
  toggleLike,
  serveUsersPost,
} = require('../handlers/post');

const route = express.Router();

route.post('/signUp', signUpUser);
route.post('/signIn', signInUser);

route.use(auth);
route.get('/userDetails', (req, res) => res.send(req.user));
route.get('/getUser/:username', serveUser);
route.get('/newsFeeds', serveNewsFeeds);
route.get('/toggleLike/:id', toggleLike);
route.get('/getPosts/:username', serveUsersPost);

module.exports = route;
