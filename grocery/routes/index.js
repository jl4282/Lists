var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db');
var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res, next) {
  List.find(function(err, lists, count) {
    res.render('index', {lists: lists});
  });
});

router.get('/create', function(req, res, next) {
  res.render('create', {});
});

router.post('/create', function(req, res, next) {
  new List({
    name: req.body.name,
    createdBy: req.body.createdBy
  }).save(function(err, list, count){
    if (!err){
      res.redirect(list.slug);
    }
    else {
      console.log('Error occured while saving');
    }
  });
});

router.get('/:slug', function(req, res, next) {
  List.findOne({slug: req.params.slug}, function(err, list, count){
    if (!err){
      res.render('list', {list: list});
    }
    else{
      console.log('Error: no such list exists');
    }
  });
});

module.exports = router;
