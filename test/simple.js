'use strict';

var Simple = require('..').Simple;
var testUtilities = require('./utilities.js');
var _ = require('lodash');

var simple = new Simple();

describe('Simple', function () {
  // Test each simple article source
  _.each(Simple.urls, function (url, name) {
    describe(name + '()', function () {
      it('should get articles', function (cb) {
        this.timeout(2 * 60 * 1000);

        simple[name](testUtilities.testArticles(cb));
      });
    });
  });
});
