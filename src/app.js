const path = require('path')
const express = require('express');
const route = require('./routes/route');
const cookieParser = require('cookie-parser');
require('./db/connect');

const app = express();

app.use(express.static('./build'));
app.use(cookieParser());
app.use(express.json({ limit: '30mb' }));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/api', route);
app.use('/media', express.static('./media/posts'));
app.use('/avatar', express.static('./media/avatars'));
app.use('/blob', express.static('./media/blobs'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
