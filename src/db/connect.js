const mongoose = require('mongoose');
const databaseUrl = process.env.MONGODB_URL;
console.log(databaseUrl);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
