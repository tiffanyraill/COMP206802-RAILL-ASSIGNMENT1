var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Portfolio',
  message: 'This is what I have been doing for the Past 3 Years!'
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
    res.render('contactMe');
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
