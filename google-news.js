'use strict';

var async = require('async');
var Diffbot = require('diffbot').Diffbot;
var htmlParser = require('htmlparser2');
var request = require('request');
var _ = require('lodash');

var BASE_URL = 'https://news.google.com/news/feeds?pz=1&cf=all&ned=us&output=atom';

var getTopLinks = exports.getTopLinks = function (cb) {
  request(BASE_URL, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return cb(err);
    }

    var dom = htmlParser.parseFeed(body);
    var links = [];

    dom.items.forEach(function (item) {
      // XXX: Wish I did't have to decode html entities myself
      links.push(item.link.replace(/&amp;/g, '&'));
    });

    return cb(null, links);
  });
};

exports.getTopArticles = function (token, cb) {
  var diffbot = new Diffbot(token);

  getTopLinks(function (err, links) {
    if (err) {
      return cb(err);
    }

    async.map(links, function (link, cbMapLinks) {
      diffbot.article({uri: link}, function (err, res) {
        if (!res.text) {
          res.text = '';
        }

        var article = res.text
          .replace(/’’/g, '"')
          .replace(/“|”|„|‟/g, '"')
          .replace(/‘|’|‛/g, "'");

        cbMapLinks(err, article);
      });
    },
    function (err, articles) {
      // TODO: Change to use debug
      console.log('→ article lengths', _.pluck(articles, 'length'));

      cb(err, articles);
    });
  });
};
