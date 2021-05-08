var express = require('express');
var router = express.Router();
var fs = require('fs')
const monk = require('monk')
const url = 'localhost:27017/hotelsystem';
const db = monk(url);

db.then(() => {
  console.log('booking Connected to server')
})

const data_hotels = [
    { id: 1, name: "hotel_1", location: "location_1", phone: "012-345-6789",
      room: [
        { id: 1, name: "Executive Pool Villa", detail: "2 extra-large double beds", sleeps: "4"},
        { id: 2, name: "Premium Pool Villa", detail: "2 extra-large double beds", sleeps: "4"}
      ]
    },
    { id: 2, name: "hotel_2", location: "location_2", phone: "012-345-6789"},
    { id: 3, name: "hotel_3", location: "location_3", phone: "012-345-6789"}
];

// API สำหรับส่งข้อมูลรายละเอียดแต่ละ ID ของโรมแรมที่ร้องขอ
// id : Hotel ID
router.get('/:id/detail_hotel', function (req, res, next) {
    // ดึงข้อมูลจากดาต้าเบส
    //var HotelData = db.get('hotel');
   // HotelData.find({_id:req.params.id})
     // .then(async (data) => {
     //   res.json(HotelData);
    //  });
    //let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    //res.json(data_hotel);
});

// API สำหรับส่งข้อมูลรายละเอียดของ User ID นั้นๆว่าได้จองโรมแรมอะไรบ้าง
// id : User ID
router.get('/:id/detail_List_booking', function (req, res, next) {

  fs.readFile('./JsonFile/BKEP.json', 'utf-8', function(err, data) {
    if (err) throw err

    var arrayOfObjects = JSON.parse(data);

    let List_booking = arrayOfObjects.Booking.find(c => c.user_id == (req.params.id));

    console.log(typeof req.params.id);
    console.log(List_booking);

    res.json(List_booking);
    
  });

});

// ในหน้า List แต่ละโรมแรมจะมี href ที่ระบุแต่ละ ID เพื่อเข้าไป booking
// id : Hotel ID
router.get('/:id', function (req, res, next) {
    var HotelData = db.get('hotel');
    HotelData.find({_id:req.params.id})
      .then(async (data) => {
        console.log(data[0])
        res.render('detail_hotel',{items:data[0]});
      });
    //let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    //if(!data_hotels) res.status(404).send("Not found");
    //res.render('detail_hotel',{ id: data_hotel.id});
});

// หน้าโชว์รายละเอียดว่าได้จองที่ไหนไปบ้าง
// id : User ID
router.get('/:user_name/List_booking', function (req, res, next) {
  var bookdata = db.get('user');
  bookdata.find({username:req.params.user_name}).then(async (data) => {
    console.log(data[0].bookingdata)
    res.render('List_booking_each_person',{ booked: data[0]});
  });
});

router.post('/booking', function (req, res, next) {
  if(req.body.user_name == ""){
    res.render('sign_in');
  }

  var bookdata = db.get('user');
  bookdata.update({username:req.body.user_name}, {$set: {bookingdata:{hotel_id: req.body.hotel_id,
    check_in_date: req.body.check_in_date,
    check_out_date: req.body.check_out_date}}})
    console.log('Booking Successful');
    
  bookdata.find({username:req.body.user_name}).then(async (data) => {
  console.log(data[0].bookingdata)
  res.render('List_booking_each_person',{ booked: data[0]});
  });
});

function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i], i;
}


module.exports = router;