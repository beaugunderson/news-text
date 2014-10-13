'use strict';

var should = require('chai').should();

var GoogleNews = require('..').GoogleNews;
var testUtilities = require('./utilities.js');

function testLinks(cb) {
  return function (err, links) {
    should.not.exist(err);

    links.should.be.instanceOf(Array);
    links.length.should.be.above(0);

    links.forEach(function (link) {
      link.length.should.be.above(0);
    });

    cb();
  };
}

describe('google-news', function () {
  var googleNews = new GoogleNews(process.env.DIFFBOT_TOKEN);

  it('should get search links', function (cb) {
    googleNews.searchLinks('obama', testLinks(cb));
  });

  it('should get the top links', function (cb) {
    googleNews.topLinks(testLinks(cb));
  });

  it('should get search articles', function (cb) {
    this.timeout(30 * 1000);

    googleNews.searchArticles('obama', testUtilities.testArticles(cb));
  });

  it('should get the top articles', function (cb) {
    this.timeout(30 * 1000);

    googleNews.topArticles(testUtilities.testArticles(cb));
  });
});
