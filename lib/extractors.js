'use strict';

var article = require('article');
var async = require('async');
var blindparser = require('blindparser');
var request = require('request').defaults({maxRedirects: 5});

var normalizeQuotess = exports.normalizeQuotess = function (text) {
  return text
    .replace(/‘|’|‛/g, "'")
    .replace(/''|``|’’/g, '"')
    .replace(/“|”|„|‟/g, '"');
};

function normalizeArticle(cb) {
  return function (err, article) {
    if (err || !article || !article.text) {
      article = {text: ''};
    }

    cb(null, normalizeQuotess(article.text));
  };
}

exports.diffbotMapLinks = function (diffbot, links, cb) {
  async.map(links, function (link, cbMapLinks) {
    diffbot.article({uri: link}, normalizeArticle(cbMapLinks));
  }, cb);
};

exports.articleMapLinks = function (links, cb) {
  async.map(links, function (link, cbMapLinks) {
    request(link)
      // Sometimes we exceed maxRedirects, especially for the NYT
      .on('error', function () {
        cbMapLinks(null, '');
      })
      .pipe(article(link, normalizeArticle(cbMapLinks)));
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

exports.articles = function (url, extractor, cb) {
  async.seq(linksFromFeed, extractor)(url, cb);
};
