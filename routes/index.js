var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'My Portfolio',
        message: 'COMPUTER PROGRAMMER ☆ COMPUTER SYSTEMS TECHNICIAN NETWORKING'
    });
});

/*GET aboutMe */
router.get('/aboutMe', function(req, res, next) {
    //load the aboutMe.ejs view
    res.render('aboutMe');
});
/*GET contactMe */
router.get('/contactMe', function(req, res, next) {
    //load the contactMe.ejs view
    res.render('contactMe', {message: ''});
});

/* GET register */
router.get('/register', function(req, res, next) {
    // load the register.ejs view
    res.render('register', {
        title: 'Please Register'
    });
});
/* GET login */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Please Login'
    });
});
/*GET Projects */
router.get('/Projects', function(req, res, next) {
    //load the Projects.ejs view
    res.render('Projects');
});
/*GET Services */
router.get('/Services', function(req, res, next) {
    //load the Services .ejs view
    res.render('Services');
});

module.exports = router;