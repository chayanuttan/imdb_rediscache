var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'localhost:27017/hotelsystem';
const db = monk(url);

db.then(() => {
    console.log('outh Connected correctly to server')
  })

router.get('/register', function (req, res, next) {
    res.render('sign_up');
});

router.get('/login', function (req, res, next) {
    res.render('sign_in');
});

router.post('/register', function (req, res, next) {
    console.log(req.body.username);
    var rows = db.get('user');
    rows.insert({
      username:req.body.username,
      password:req.body.password,
      ssn:req.body.ssn,
      phone:req.body.phone_number
    })
    // หาก ลงทะเบียนสำเร็จ
    if (true == true){
        // จะเก็บ id object ลง username
        res.cookie('username',req.body.username, { maxAge: 900000, httpOnly: true });
        console.log('register successfully');
    } else {
        res.render('sign_up');
    }

    res.render('sign_in');
    
});

router.post('/login', function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);

    // หาก ล็อกอินสำเร็จ
    if (true == true){
        // จะเก็บ id object ลง username
        res.cookie('username',req.body.username, { maxAge: 900000, httpOnly: true });
        console.log('login successfully');
    } else {
        res.render('sign_in');
    }

    res.render('index');
});

module.exports = router;