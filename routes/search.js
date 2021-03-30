var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/imdb';
const db = monk(url);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('resultsearch');
  });
router.post('/', function(req, res, next) {
    console.log(req.body.name);
    }
  );


module.exports = router;