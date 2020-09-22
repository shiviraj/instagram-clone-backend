const request = require('supertest');
const app = require('../src/app');
const {
  setupDatabase,
  cleanupDatabase,
  post1,
  post2,
  user1,
} = require('./fixture/db');

describe('Static files', () => {
  context('Images', () => {
    it('Should serve the images by path', (done) => {
      request(app).get('/media/background-1.jpg').expect(200).end(done);
    });
  });
});

describe('App', () => {
  context('Api', () => {
    before(setupDatabase);
    after(cleanupDatabase);
    it('Should fetch all news feeds', (done) => {
      request(app)
        .get('/api/newsFeeds')
        .set('Cookie', `token=${user1.tokens[0].token}`)
        .expect(200)
        .end(done);
    });

    it('Should get all the post of given user', (done) => {
      request(app)
        .get(`/api/getPosts/${user1.username}`)
        .set('Cookie', `token=${user1.tokens[0].token}`)
        .expect(200)
        .end(done);
    });

    it('Should find user by username', (done) => {
      request(app)
        .get(`/api/getUser/${user1.username}`)
        .set('Cookie', `token=${user1.tokens[0].token}`)
        .expect(200)
        .end(done);
    });

    it('Should not get all the post if user is not logged in', (done) => {
      request(app).get('/api/authorPosts').expect(401).end(done);
    });
  });

  context('Sign up', () => {
    beforeEach(setupDatabase);
    afterEach(cleanupDatabase);
    it('Should signup a new user', (done) => {
      request(app)
        .post('/api/signUp')
        .send({
          username: 'Shivira',
          name: 'Shivam',
          password: 'what789!!',
          email: 'shi@example.com',
        })
        .expect(201)
        .end(done);
    });

    it('Should not signup if user already exists', (done) => {
      request(app)
        .post('/api/signUp')
        .send({
          username: 'shiviraj',
          name: 'Shivam',
          password: 'what789!!',
          email: 'shi@example.com',
        })
        .expect(400)
        .end(done);
    });
  });

  context('Sign In', () => {
    beforeEach(setupDatabase);
    afterEach(cleanupDatabase);
    it('Should signIn a user', (done) => {
      request(app)
        .post('/api/signIn')
        .send({ password: 'shivi', email: 'shivi@raj.com' })
        .expect(200)
        .end(done);
    });

    it('Should not signIn if credentials not matched', (done) => {
      request(app)
        .post('/api/signIn')
        .send({ password: 'what789!!', email: 'shi@example.com' })
        .expect(400)
        .end(done);
    });

    it('Should not signIn if credentials not matched', (done) => {
      request(app)
        .post('/api/signIn')
        .send({ password: 'what789!!', email: 'shivi@raj.com' })
        .expect(400)
        .end(done);
    });
  });

  context('Api to update DB', () => {
    beforeEach(setupDatabase);
    afterEach(cleanupDatabase);
    it('Should toggle the like on particular post', (done) => {
      request(app)
        .get(`/api/toggleLike/${post1._id}`)
        .set('Cookie', `token=${user1.tokens[0].token}`)
        .expect(200)
        .end(done);
    });
    it('Should toggle the like on particular post', (done) => {
      request(app)
        .get(`/api/toggleLike/${post2._id}`)
        .set('Cookie', `token=${user1.tokens[0].token}`)
        .expect(200)
        .end(done);
    });
  });
});
