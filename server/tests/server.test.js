const request = require('supertest');
const expect = require('expect');

const { app } = require('../server');

describe('GET /api/search', () => {
  it('should get a list of restaurants', done => {
    request(app)
      .get('/api/search')
      .query({ postcode: 'sw35qy' })
      .query({ cuisine: 'chinese' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveLength(12);
      })
      .expect(res => {
        expect(res.body[0]).toHaveProperty('address');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('phone');
        expect(res.body[0]).toHaveProperty('reviews');
        expect(res.body[0]).toHaveProperty('price');
        expect(res.body[0]).toHaveProperty('rating');
      })
      .end(done);
  });
});
