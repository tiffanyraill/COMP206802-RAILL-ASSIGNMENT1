var express = require('express');
var router = express.Router();

//add passport for register and login
var passport = require('passport');
var Account = require('../models/account');


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
        title: 'Please Register',
        user: null
    });
});

/* GET login */
router.get('/login', function(req, res, next) {

    var messages = req.session.messages || [];

    // clear messages from session
    req.session.messages = [];

    res.render('login', {
        title: 'Please Login',
        messages: messages,
        user: null
    });
});

/*POST register */

router.post('/register', function(req, res, next){
    //use account model to create a new user account
    Account.register(new Account({ username: req.body.username }),
        req.body.password, function(err, account) {
        if(err)
        {
        console.log(err);
        res.render('error', {title: 'create Account Error'});
        }
        res.redirect('/login');
        });

    });

/* POST login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/papers',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
    req.logout();

    res.redirect('/');
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