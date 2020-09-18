const express = require('express');

const { serveNewsFeeds } = require('../handlers/handler');

const route = express.Router();

route.get('/newsFeeds', serveNewsFeeds);

module.exports = route;
