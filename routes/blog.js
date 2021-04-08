var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/hotelsystem';
const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('blog');
  });
router.get('/add', function(req, res, next) {
    res.render('addblog');
  });
router.post('/add', function(req, res, next) {
    console.log(req.body.name);
    var rows = db.get('hotel');
    rows.insert({
      name:req.body.name,
      location:req.body.description,
      phone:req.body.phone
    }),function(err,blog){
      if(err){
        res.send(err);
      }else{
        res.redirect('/');
      }
    }
  });

  module.exports = router;