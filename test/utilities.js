'use strict';

require('chai').should();

var _ = require('lodash');

exports.testArticles = function (cb) {
  return function (err, articles) {
    if (err) {
      return cb(err);
    }

    articles.should.be.instanceOf(Array);
    articles.length.should.be.above(0);

    _.some(articles, function (article) {
      return article.length > 0;
    }).should.equal(true);

    cb();
  };
};
