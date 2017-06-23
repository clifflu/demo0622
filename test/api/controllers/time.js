var should = require('should');
var request = require('supertest');
var server = require('../../../app');

const moment = require('moment-timezone')

describe('controllers', function() {
  describe('time', function() {
    describe('GET /ask', function() {

      it('should return UTC ISO8601 without tz', function(done) {
        request(server)
          .get('/time')
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json')
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql({time: moment.tz('utc').format()});
            done();
          });
      });

      it('should return UTC ISO8601 without tz', function(done) {
        function testTz(tz) {
          return new Promise((resolve, reject) => {
            request(server)
              .get('/time')
              .query({tz})
              .set('Accept', 'application/json')
              .expect('Content-Type', 'application/json')
              .expect(200)
              .end(function(err, res) {
                if (err) {
                  return reject(err)
                }
                res.body.should.eql({time: moment.tz(tz).format()});
                resolve();
              });
          })
        }

        let promises = ['Asia/Taipei', 'America/Denver'].map(testTz)
        Promise.all(promises).then(() => done()).catch(done)
      });

      it('should return Bad Request on unexpected params', function(done) {
        let param = "no such timezone"
        let queryParam = {}
        queryParam[param] = '1'

        request(server)
          .get('/time')
          .query(queryParam)
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json')
          .expect(400)
          .end(function(err, res) {
            if (err) {
              return done(err)
            }
            res.body.should.eql({message: `Unexpected query param "${param}"`});
            done();
          })
      });

    }); // GET /ask
  }); // Controller: time
}); // controllers
