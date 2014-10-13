var should = require('chai').should();

var googleNews = require('..');

describe('getTopLinks', function () {
  it('should get the top links', function (cb) {
    googleNews.getTopLinks(function (err, links) {
      should.not.exist(err);

      links.should.be.instanceOf(Array);
      links.length.should.be.above(0);

      links.forEach(function (link) {
        link.length.should.be.above(0);
      });

      cb();
    });
  });

  it('should get the top articles', function (cb) {
    this.timeout(15000);

    var diffbotToken = process.env.DIFFBOT_TOKEN;

    googleNews.getTopArticles(diffbotToken, function (err, articles) {
      should.not.exist(err);

      articles.should.be.instanceOf(Array);
      articles.length.should.be.above(0);

      articles.forEach(function (article) {
        article.length.should.be.above(0);
      });

      cb();
    });
  });
});
