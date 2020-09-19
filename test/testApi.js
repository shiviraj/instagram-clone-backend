const request = require('supertest');
const app = require('../src/app');
const {
  setupDatabase,
  cleanupDatabase,
  post1,
  post2,
} = require('./fixture/db');

describe('Static files', () => {
  context('Images', () => {
    it('Should serve the images by path', (done) => {
      request(app).get('/images/background-1.jpg').expect(200).end(done);
    });
  });
});

describe('App', () => {
  context('Api', () => {
    before(setupDatabase);
    after(cleanupDatabase);
    it('Should fetch all news feeds', (done) => {
      request(app).get('/api/newsFeeds').expect(200).end(done);
    });

    it('Should get all the post of given user', (done) => {
      request(app).get('/api/authorPosts').expect(200).end(done);
    });
  });

  context('Api to update DB', () => {
    beforeEach(setupDatabase);
    afterEach(cleanupDatabase);
    it('Should toggle the like on particular post', (done) => {
      request(app).get(`/api/toggleLike/${post1._id}`).expect(200).end(done);
    });
    it('Should toggle the like on particular post', (done) => {
      request(app).get(`/api/toggleLike/${post2._id}`).expect(200).end(done);
    });
  });
});
