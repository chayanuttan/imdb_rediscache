var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/hotelsystem';
const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
