'use strict';

var Diffbot = require('diffbot').Diffbot;
var _ = require('lodash');

var extractors = require('./extractors.js');

module.exports = function NewsExtractor(optionalOptions) {
  if (!optionalOptions) {
    optionalOptions = {};
  }

  if (optionalOptions.diffbotToken) {
    this.diffbot = new Diffbot(optionalOptions.diffbotToken);

    if (!optionalOptions.extractor) {
      // This is probably a dumb way to do it...
      this.extractor = _.partial(extractors.diffbotMapLinks, this.diffbot);
    }
  } else {
    this.extractor = extractors.articleMapLinks;
  }
};
