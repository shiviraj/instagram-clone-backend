const express = require('express');
const route = require('./routes/route');
const cookieParser = require('cookie-parser');

require('./db/connect');

const app = express();
app.use((req, res, next) => {
  console.log(req.url, new Date());
  next();
});

app.use(cookieParser());
app.use(express.json({ limit: '4mb' }));

app.use('/api', route);

module.exports = app;
