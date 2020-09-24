const express = require('express');
const auth = require('../middleware/auth');

const { mediaValidator, uploadMedia } = require('../handlers/media');

const {
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
} = require('../handlers/user');

const {
  serveNewsFeeds,
  servePost,
  toggleLike,
  serveUsersPost,
  uploadPost,
} = require('../handlers/post');

const { updateComment } = require('../handlers/comments');

const route = express.Router();

route.post('/isAvailable', serveIsAvailable);
route.post('/isAvailableEmail', serveIsAvailableEmail);
route.post('/signUp', signUpUser);
route.post('/signIn', signInUser);
route.get('/getClientID', serveClientID);
route.get('/signInOauth/:code', signInOAuth);

route.use(auth);
route.get('/logout', logoutUser);
route.get('/userDetails', (req, res) => res.send(req.user));
route.get('/getUser/:username', serveUser);
route.get('/getUsers/:username', serveUsers);
route.get('/newsFeeds', serveNewsFeeds);
route.get('/getPost/:id', servePost);
route.get('/toggleLike/:id', toggleLike);
route.post('/comment', updateComment);
route.get('/getPosts/:username', serveUsersPost);
route.post('/uploadPost', uploadPost);
route.post('/uploadMedia', mediaValidator, uploadMedia);
route.post('/uploadAvatar', mediaValidator, updateAvatar);
route.post('/changeProfile', updateProfile);
route.post('/changePassword', updatePassword);
module.exports = route;
