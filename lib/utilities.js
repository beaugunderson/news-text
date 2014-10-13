'use strict';

var async = require('async');
var blindparser = require('blindparser');
var Diffbot = require('diffbot').Diffbot;

var cleanQuotes = exports.cleanQuotes = function (text) {
  return text
    .replace(/‘|’|‛/g, "'")
    .replace(/''|``|’’/g, '"')
    .replace(/“|”|„|‟/g, '"');
};

var diffbot = exports.diffbot = new Diffbot(process.env.DIFFBOT_TOKEN);

var diffbotMapLinks = exports.diffbotMapLinks = function (links, cb) {
  async.map(links, function (link, cbMapLinks) {
    diffbot.article({uri: link}, function (err, article) {
      cbMapLinks(err, cleanQuotes(article.text || ''));
    });
  }, cb);
};

var linksFromFeed = exports.linksFromFeed = function (url, cb) {
  blindparser.parseURL(url, function (err, feed) {
    if (err) {
      return cb(err);
    }

    var links = feed.items.map(function (item) {
      return (item.link[0] || '');
    });

    return cb(null, links);
  });
};

exports.articles = function (url, cb) {
  async.seq(
    linksFromFeed,
    diffbotMapLinks
  )(url, cb);
};
