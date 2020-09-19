const express = require('express');

const {
  serveNewsFeeds,
  toggleLike,
  serveAuthorsPost,
} = require('../handlers/handler');

const route = express.Router();

route.get('/newsFeeds', serveNewsFeeds);
route.get('/toggleLike/:id', toggleLike);
route.get('/authorPosts', serveAuthorsPost);

module.exports = route;
