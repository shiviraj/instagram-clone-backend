const request = require('supertest');
const app = require('../src/app');
const { setupDatabase, cleanupDatabase } = require('./fixture/db');

describe('Static files', () => {
  context('Images', () => {
    it('Should serve the images by path', (done) => {
      request(app).get('/images/background-1.jpg').expect(200).end(done);
    });
  });
});

describe('App', () => {
  before(setupDatabase);
  after(cleanupDatabase);
  context('Api', () => {
    it('Should fetch all news feeds', (done) => {
      request(app).get('/api/newsFeeds').expect(200).end(done);
    });
  });
});
