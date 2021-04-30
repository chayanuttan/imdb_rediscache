var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/hotelsystem';
const db = monk(url);

db.then(() => {
  console.log('Search Connected to server')
})
// const axios = require('axios')
// const redis = require('redis')

// const client = redis.createClient()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('resultsearch');
});

router.post('/', async (req, res, next) => {
  console.log(req.body.name);
    var HotelData = db.get('hotel');
    HotelData.find({region:req.body.name+" Province"})
      .then(async (data) => {
        res.render('resultsearch', { items: data });
      });
    // res.json({items: data});
  });


module.exports = router;