const express = require('express');
const route = require('./routes/route');
const cookieParser = require('cookie-parser');
require('./db/connect');

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '4mb' }));

app.use((req, res, next) => {
  console.log(req.method, req.path, req.url);
  next();
});

app.use('/api', route);
app.use('/images', express.static('./imageStorage'));

module.exports = app;
