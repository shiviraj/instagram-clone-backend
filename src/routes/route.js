const express = require('express');

const { serveNewsFeeds, toggleLike } = require('../handlers/handler');

const route = express.Router();

route.get('/newsFeeds', serveNewsFeeds);
route.get('/toggleLike/:id', toggleLike);

module.exports = route;
