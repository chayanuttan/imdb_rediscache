var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/hotelsystem';
const db = monk(url);
const axios = require('axios')
const redis = require('redis')

const client = redis.createClient()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('resultsearch');
});

const cachingHotel = async(req,res,next)=> {
  client.get('items', async (error, data) => {
  if (data) {
    return res.render('resultsearch', { items: JSON.parse(data) });
  }
  next()
  })
}

router.post('/', cachingHotel, async (req, res, next) => {
  console.log(req.body.name);
    var HotelData = db.get('hotel');
    HotelData.find({region:req.body.name+" Province"})
      .then(async (data) => {
        client.setex('items', 60, JSON.stringify(data))
        res.render('resultsearch', { items: data });
      });
    // res.json({items: data});
  });


module.exports = router;