var express = require('express');
var router = express.Router();
var fs = require('fs')

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
    let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    res.json(data_hotel);
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
    let data_hotel = data_hotels.find(c => c.id == (req.params.id));
    if(!data_hotels) res.status(404).send("Not found");
    res.render('detail_hotel',{ id: data_hotel.id});
});

// หน้าโชว์รายละเอียดว่าได้จองที่ไหนไปบ้าง
// id : User ID
router.get('/:id/List_booking', function (req, res, next) {

  res.render('List_booking_each_person',{ id: req.params.id});

});

router.post('/booking', function (req, res, next) {

    fs.readFile('./JsonFile/BKEP.json', 'utf-8', function(err, data) {
      if (err) throw err
    
      var arrayOfObjects = JSON.parse(data);
      var x, index = findElement(arrayOfObjects.Booking, "user_id", req.body.user_id);

      arrayOfObjects.Booking[index].List_Booking.push({
        hotel_id: req.body.hotel_id,
        check_in_date: req.body.check_in_date,
        check_out_date: req.body.check_out_date
      });
  
      fs.writeFile('./JsonFile/BKEP.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Booking Successful');
    
        // res.send(arrayOfObjects);

        // หลังจากจองเสร็จ จะกลับไปโชว์ว่าตอนนี้ได้ของที่ไหนไปบ้าง
        res.render('List_booking_each_person',{ id: req.body.user_id});
      });
      
    });
});

function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i], i;
}

module.exports = router;