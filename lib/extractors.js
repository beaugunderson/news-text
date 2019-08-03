'use strict';

var http = require('http');

// Node's default maxSockets is 5, we override this to speed things up but only
// if it's lower than we want to begin with (meaning someone else hasn't
// changed it).

// TODO: Figure out how to specify an agent for use with request with a higher
// maxSockets.
if (http.globalAgent.maxSockets < 500) {
  http.globalAgent.maxSockets = 500;
}

var article = require('article');
var async = require('async');
var blindparser = require('blindparser');
var debug = require('debug')('news-text');
var request = require('request').defaults({maxRedirects: 5});

function normalizeArticle(cb) {
  return function (err, article) {
    if (err) {
      console.error('Error parsing article', err);
    }

    cb(null, (article && article.text) ? article.text : '');
  };
}

exports.diffbotMapLinks = function (diffbot, links, cb) {
  async.map(links, function (link, cbMap) {
    diffbot.article({uri: link}, normalizeArticle(cbMap));
  }, cb);
};

exports.articleMapLinks = function (links, cb) {
  debug('articleMapLinks with %d links', links.length);

  async.map(links, function (link, cbMap) {
    request(link)
      // Sometimes we exceed maxRedirects, especially for the NYT
      .on('error', function (err) {
        console.error('Caught error requesting link:', err);

        cbMap(null, '');
      })
      .pipe(article(link, normalizeArticle(cbMap)));
  }, cb);
};

var linksFromFeed = exports.linksFromFeed = function (url, cb) {
  debug('linksFromFeed for URL %s', url);

  blindparser.parseURL(url, function (err, feed) {
    if (err) {
      return cb(err);
    }

    var links = feed.items.map(function (item) {
      return (item.link || '');
    });

    return cb(null, links);
  });
};

exports.articles = function (url, extractor, cb) {
  debug('articles for URL %s', url);

  async.seq(linksFromFeed, extractor)(url, cb);
};
