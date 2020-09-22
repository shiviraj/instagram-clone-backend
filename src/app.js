const express = require('express');
const route = require('./routes/route');
const cookieParser = require('cookie-parser');
require('./db/connect');

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '30mb' }));

app.use('/api', route);
app.use('/media', express.static('./media/posts'));
app.use('/avatar', express.static('./media/avatars'));
app.use('/blob', express.static('./media/blobs'));

module.exports = app;
