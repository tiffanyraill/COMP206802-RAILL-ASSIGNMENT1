/**
 * Created by tiffanyraill on 2017-03-27.
 */
var express = require('express');
var router = express.Router();

// link to the recipes model for CRUD operations
var Paper = require('../models/paper');

/* GET papers main page */
router.get('/', function(req, res, next) {

    // use mongoose model to query mongodb for all papers
    Paper.find(function(err, papers) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }

        // no error so send the papers to the index view
        res.render('papers/index', {
            papers: papers,
            title: 'Title'
        });
    });
});

// GET /papers/add - show blank add form
router.get('/add', function(req, res, next) {
    // show the add form
    res.render('papers/add', {
        title: 'Paper Description'
    });
});

// POST /papers/add - save the new paper
router.post('/add', function(req, res, next) {
    // use Mongoose to populate a new Paper
    Paper.create({
        title: req.body.title,
        course: req.body.course,
        description: req.body.description
    }, function(err, paper) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/papers');
    });
});

// GET /papers/delete/_id - delete and refresh the index view
router.get('/delete/:_id', function(req, res, next) {
    // get the id parameter from the end of the url
    var _id = req.params._id;

    // use Mongoose to delete
    Paper.remove({ _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/papers');
    });
});

// GET /papers/_id - show edit page and pass it the selected recipe
router.get('/:_id', function(req, res, next) {
    // grab id from the url
    var _id = req.params._id;

    // use mongoose to find the selected recipe
    Paper.findById(_id, function(err, paper) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('papers/edit', {
            paper: paper,
            course: 'Course',
            description: 'Description'
        });
    });
});

// POST /papers/_id - save the updated paper
router.post('/:_id', function(req, res, next) {
    // grab id from url
    var _id = req.params._id;

    // populate new paper from the form
    var paper = new Paper({
        _id: _id,
        title: req.body.title,
        course: req.body.course,
        description: req.body.description
    });

    Paper.update({ _id: _id }, paper,  function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/papers');
    });
});

// make this file public
module.exports = router;