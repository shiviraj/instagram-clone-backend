const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Post = require('../../src/models/post');

const user1Id = new mongoose.Types.ObjectId();
const user2Id = new mongoose.Types.ObjectId();
const post1Id = new mongoose.Types.ObjectId();
const post2Id = new mongoose.Types.ObjectId();

const user1 = {
  _id: user1Id,
  name: 'Shivam Rajput',
  username: 'shiviraj',
  email: 'shivi@raj.com',
  password: 'shivi',
  tokens: [
    { token: jwt.sign({ _id: user1Id }, process.env.SECRET_CODE) },
    {
      token: jwt.sign({ _id: user1Id }, process.env.SECRET_CODE, {
        expiresIn: 0,
      }),
    },
  ],
};

const user2 = {
  _id: user2Id,
  name: 'Rashmi Gupta',
  username: 'photongupta',
  email: 'rashmi@gupta.com',
  password: 'rashmi',
  tokens: [{ token: jwt.sign({ _id: user2Id }, process.env.SECRET_CODE) }],
};

const post1 = {
  _id: post1Id,
  postBy: user1Id,
  content:
    'Jindgi ne kya liya kya diya, baad me dekhenge, abhi to hasne ko wajah tamam rakha jaaye!!!',
  photos: ['background-1.jpg', 'background-2.jpg'],
  likes: [user2Id],
};

const post2 = {
  _id: post2Id,
  postBy: user2Id,
  content:
    'Dil me utar jaaun aise ki lahoo ho jaau, tere ishq me subah vanaras shaam lucknow ho jaau!!',
  photos: ['background-3.jpg'],
  likes: [user1Id, user2Id],
};

const setupDatabase = async () => {
  await new User(user1).save();
  await new User(user2).save();
  await new Post(post1).save();
  await new Post(post2).save();
};

const cleanupDatabase = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
};

module.exports = { setupDatabase, cleanupDatabase, user1, user2, post1, post2 };
