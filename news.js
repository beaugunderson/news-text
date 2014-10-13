'use strict';

var Diffbot = require('diffbot').Diffbot;
var utilities = require('./lib/utilities.js');
var _ = require('lodash');

// XXX: Is this a dumb way to do things?
exports.setDiffbotToken = function (token) {
  utilities.diffbot = new Diffbot(token);
};

var simpleUrls = exports.simpleUrls = {
  CNN: 'http://rss.cnn.com/rss/cnn_topstories.rss',
  FoxNews: 'http://feeds.foxnews.com/foxnews/latest',
  NYT: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  WPSheThePeople: 'http://feeds.washingtonpost.com/rss/rss_she-the-people',
  AP: 'http://hosted.ap.org/lineups/USHEADS-rss_2.0.xml?SITE=SCAND&SECTION=HOME'
};

exports.simple = {};

_.forOwn(simpleUrls, function (url, name) {
  exports.simple[name] = _.partial(utilities.articles, url);
});

exports.GoogleNews = require('./lib/google-news.js');
