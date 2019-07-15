'use strict';

var _ = require('lodash');

var extractors = require('./extractors.js');
var NewsExtractor = require('./news-extractor.js');

var GoogleNews = module.exports = function (optionalOptions) {
  NewsExtractor.call(this, optionalOptions);

  this.SEARCH_URL = 'https://news.google.com/rss/search?q=';
  this.FEED_URL = 'https://news.google.com/news/rss';
};

GoogleNews.prototype = _.create(NewsExtractor.prototype, {
  constructor: GoogleNews
});

GoogleNews.prototype.searchLinks = function (search, cb) {
  extractors.linksFromFeed(
    search ? this.SEARCH_URL + search : this.FEED_URL, cb);
};

GoogleNews.prototype.searchArticles = function (search, cb) {
  var self = this;

  this.searchLinks(search, function (err, links) {
    if (err) {
      return cb(err);
    }

    self.extractor(links, cb);
  });
};

GoogleNews.prototype.topArticles = function (cb) {
  this.searchArticles(null, cb);
};

GoogleNews.prototype.topLinks = function (cb) {
  this.searchLinks(null, cb);
};
