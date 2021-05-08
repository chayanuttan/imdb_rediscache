var express = require('express');
var router = express.Router();
const monk = require('monk')
// Connection URL
const url = 'mongodb://localhost:27017/hotelsystem';
// const url = 'mongodb://127.0.0.1:27017';
const db = monk(url);

async function run() {
  try {
    // Connect the client to the server
    await db.connect();
  } catch {
    // Ensures that the client will close when you finish/error
    console.log('It can\'t connect database');
  }

  try {
    // Establish and verify connection
    await db.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch {
    // Ensures that the client will close when you finish/error
    console.log('It\'s error');
  }
}
run().catch(console.dir);

db.then(() => {
    console.log('outh Connected correctly to server')
})

router.get('/register', function (req, res, next) {
    res.render('sign_up');
});

router.get('/login', function (req, res, next) {
    res.render('sign_in');
});

router.get('/logout', function (req, res, next) {

    // To delete a cookie, you just need to set the value of
    // the cookie to empty and set the value of expires to a passed date.

    res.cookie('username','', { maxAge: 0, httpOnly: false });

    res.render('index');
});

router.post('/register', function (req, res, next) {
    console.log(req.body.username);
    var rows = db.get('user');
    rows.insert({
      username:req.body.username,
      password:req.body.password,
      ssn:req.body.ssn,
      phone:req.body.phone_number})
    rows.find({username:req.body.username},{password:req.body.password})
      .then(async (data) =>{
        if (data = !undefined){ // หาก ลงทะเบียนสำเร็จ
            // จะเก็บ id object ลง username
            res.cookie('username',req.body.username, { maxAge: 900000, httpOnly: false });
            console.log('register successfully');
        } else {
            res.render('sign_up');
        }
        res.render('sign_in');
      });
    });

router.post('/login', function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    // ยังไม่ได้เช็คว่ารหัสถูกต้องหรือป่าว
    var userData = db.get('user');
    userData.find({username:req.body.username},{password:req.body.password})
      .then(async (data) => {
        if (data = !undefined){
        res.cookie('username',req.body.username, { maxAge: 900000, httpOnly: false });
        console.log('login successfully');
        }else {
            res.render('sign_in');
          }
        res.render('index');
    });
});

module.exports = router;