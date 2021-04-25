var express = require('express');
var router = express.Router();

const data_hotels = [
    { id: 1, name: "hotel_1", location: "location_1", phone: "012-345-6789",
      room: [
        { id: 1, name: "Executive Pool Villa", detail: "2 extra-large double beds", sleeps: "4"},
        { id: 2, name: "Premium Pool Villa", detail: "2 extra-large double beds", sleeps: "4"}
      ]
    },
    { id: 2, name: "hotel_2", location: "location_2", phone: "012-345-6789"},
    { id: 3, name: "hotel_3", location: "location_3", phone: "012-345-6789"}
]

router.get('/:id/detail', function (req, res, next) {
    let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    res.json(data_hotel);
});

router.get('/:id', function (req, res, next) {
    let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    if(!data_hotels) res.status(404).send("Not found");
    res.render('detail_hotel',{ id: data_hotel.id});
});

router.post('/booking', function (req, res, next) {
    console.log(req.body.hotel_id);
    console.log(req.body.check_in_date);
    console.log(req.body.check_out_date);
    res.render('index');
});

module.exports = router;