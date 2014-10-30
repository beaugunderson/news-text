'use strict';

var _ = require('lodash');

var NewsExtractor = require('./news-extractor.js');
var extractors = require('./extractors.js');

var Simple = module.exports = function (optionalOptions) {
  NewsExtractor.call(this, optionalOptions);

  var self = this;

  // Assign a helper function for each URL
  _.forOwn(Simple.urls, function (url, name) {
    self[name] = _.partial(extractors.articles, url, self.extractor);
  });
};

Simple.prototype = _.create(NewsExtractor.prototype, {constructor: Simple});

Simple.urls = {
  cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  foxNews: 'http://feeds.foxnews.com/foxnews/latest',
  // login required if not using diffbot :(
  //nyt: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  wpSheThePeople: 'http://feeds.washingtonpost.com/rss/rss_she-the-people',
  ap: 'http://hosted.ap.org/lineups/USHEADS-rss_2.0.xml?SITE=SCAND&SECTION=HOME'
};
