var express = require('express');
var router = express.Router();

 var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/book/:isbn', function(req, res, next) {
  console.log('ISBN', req.params.isbn)

  request('https://book-catalog-proxy-2.herokuapp.com/book?isbn=' + req.params.isbn, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage. 
      var body = JSON.parse(body);
      var title = body.items[0].volumeInfo.title;
      var cover = body.items[0].volumeInfo.imageLinks.thumbnail;
      //res.send(body);
      res.render('book', {title: title, cover: cover});
    }
  })

});

module.exports = router;
