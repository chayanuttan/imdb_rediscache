var express = require('express');
var router = express.Router();

router.get('/register', function (req, res, next) {
    res.render('sign_up');
});

router.post('/register', function (req, res, next) {
    console.log(req.body.username);

    res.render('sign_up');
});

router.get('/login', function (req, res, next) {
    res.render('sign_in');
});

module.exports = router;