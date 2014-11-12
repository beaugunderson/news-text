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
  // login required if not using diffbot :(
  //nyt: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  ap: 'http://hosted.ap.org/lineups/USHEADS-rss_2.0.xml?SITE=SCAND&SECTION=HOME',
  // more here: http://www.bbc.com/news/10628494#userss
  bbcTopStories: 'http://feeds.bbci.co.uk/news/rss.xml',
  cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  foxNews: 'http://feeds.foxnews.com/foxnews/latest',
  // ft xml is not well-formed
  //ft: 'http://www.ft.com/rss/home/us',
  nbcNews: 'http://feeds.nbcnews.com/feeds/worldnews',
  skyNews: 'http://feeds.skynews.com/feeds/rss/home.xml',
  wpSheThePeople: 'http://feeds.washingtonpost.com/rss/rss_she-the-people',

  reutersArts: 'http://feeds.reuters.com/news/artsculture',
  reutersEntertainment: 'http://feeds.reuters.com/reuters/entertainment',
  reutersMostRead: 'http://feeds.reuters.com/reuters/MostRead',
  reutersOddlyEnough: 'http://feeds.reuters.com/reuters/oddlyEnoughNews',
  reutersPolitics: 'http://feeds.reuters.com/Reuters/PoliticsNews',
  reutersTechnology: 'http://feeds.reuters.com/reuters/technologyNews',
  reutersTopNews: 'http://feeds.reuters.com/reuters/topNews',
  reutersUsNews: 'http://feeds.reuters.com/Reuters/domesticNews',
  reutersWorldNews: 'http://feeds.reuters.com/Reuters/worldNews',

  nprMostEmailed: 'http://www.npr.org/rss/rss.php?id=100',
  nprNewsHeadlines: 'http://www.npr.org/rss/rss.php?id=1001',
  nprPolitics: 'http://www.npr.org/rss/rss.php?id=1012',
  nprUsNews: 'http://www.npr.org/rss/rss.php?id=1003',
  nprWorldNews: 'http://www.npr.org/rss/rss.php?id=1004',

  abcEntertainmentHeadlines: 'http://feeds.abcnews.com/abcnews/entertainmentheadlines',
  abcMostReadStories: 'http://feeds.abcnews.com/abcnews/mostreadstories',
  abcPoliticsHeadlines: 'http://feeds.abcnews.com/abcnews/politicsheadlines',
  abcTechnologyHeadlines: 'http://feeds.abcnews.com/abcnews/technologyheadlines',
  abcTopStories: 'http://feeds.abcnews.com/abcnews/topstories',
  abcUsHeadlines: 'http://feeds.abcnews.com/abcnews/usheadlines',
  abcWorldHeadlines: 'http://feeds.abcnews.com/abcnews/internationalheadlines'
};
