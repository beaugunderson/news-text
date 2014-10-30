'use strict';

require('chai').should();

var GoogleNews = require('..').GoogleNews;
var testUtilities = require('./utilities.js');

var googleNews = new GoogleNews();

function testLinks(cb) {
  return function (err, links) {
    if (err) {
      return cb(err);
    }

    links.should.be.instanceOf(Array);
    links.length.should.be.above(0);

    links.forEach(function (link) {
      link.length.should.be.above(0);
    });

    cb();
  };
}

describe('GoogleNews', function () {
  describe('searchLinks()', function () {
    it('should search links', function (cb) {
      googleNews.searchLinks('obama', testLinks(cb));
    });
  });

  describe('topLinks()', function () {
    it('should get top links', function (cb) {
      googleNews.topLinks(testLinks(cb));
    });
  });

  describe('searchArticles()', function () {
    it('should search articles', function (cb) {
      this.timeout(30 * 1000);

      googleNews.searchArticles('obama', testUtilities.testArticles(cb));
    });
  });

  describe('topArticles()', function () {
    it('should get top articles', function (cb) {
      this.timeout(30 * 1000);

      googleNews.topArticles(testUtilities.testArticles(cb));
    });
  });
});
