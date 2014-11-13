## news-text

Retrieve the article text from several news sites using either the
[article](https://www.npmjs.org/package/article) module or
[Diffbot](http://www.diffbot.com/) (if a Diffbot key is specified).

```js
var Simple = require('news-text').Simple;

var simple = new Simple();

simple.reutersUsNews(function (err, articles) {
  articles.forEach(function (article) {
    console.log(article);
  });
});
```

Google News is searchable:

```
var GoogleNews = require('news-text').GoogleNews;

var googleNews = new GoogleNews();

googleNews.searchArticles('taylor swift', function (err, articles) {
  articles.forEach(function (article) {
    console.log(article);
  });
});
```
