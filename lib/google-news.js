'use strict';

var utilities = require('./utilities.js');

var SEARCH_URL = 'https://news.google.com/news/feeds' +
  '?cf=all&ned=us&hl=en&output=atom&q=';

var GoogleNews = module.exports = function () {};

GoogleNews.prototype.searchLinks = function (search, cb) {
  utilities.linksFromFeed(SEARCH_URL + search, cb);
};

GoogleNews.prototype.searchArticles = function (search, cb) {
  this.searchLinks(search, function (err, links) {
    if (err) {
      return cb(err);
    }

    utilities.diffbotMapLinks(links, cb);
  });
};

GoogleNews.prototype.topArticles = function (cb) {
  this.searchArticles('', cb);
};

GoogleNews.prototype.topLinks = function (cb) {
  this.searchLinks('', cb);
};
