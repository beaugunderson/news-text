'use strict';

var simple = require('..').simple;
var testUtilities = require('./utilities.js');
var _ = require('lodash');

_.forOwn(simple, function (articleFn, name) {
  describe(name, function () {
    it('should get articles', function (cb) {
      this.timeout(2 * 60 * 1000);

      articleFn(testUtilities.testArticles(cb));
    });
  });
});
