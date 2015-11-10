var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db');
var List = mongoose.model('List');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (res.locals.user){
    User
    .findOne({username: res.locals.user.username})
    .populate('lists').exec(function(err, user) {
      console.log(user);
    res.render('index', {
      user: res.locals.user,
      lists: user.lists || [],
      username: user.username
    });
  });
  }
  else{
    res.render('index');
  }
});

router.get('/create', function(req, res, next) {
  if (res.locals.user){
    res.render('create');
  }
  else {
    res.redirect('/');
  }
});

router.post('/create', function(req, res, next) {
  new List({
    name: req.body.name,
    createdBy: res.locals.user._id
  }).save(function(err, list, count){
    if (!err){
      User.findOneAndUpdate(
        {username: res.locals.user.username},
        {$push: {lists: list._id}},
        function(err, list, count) {
          if (err){
            console.log('Error updating list');
          }
      });
      res.redirect(list.slug);
    }
    else {
      console.log('Error occured while saving');
    }
  });
});

router.get('/:slug', function(req, res, next) {
  List.findOne({slug: req.params.slug})
  .populate('createdBy').exec(function(err, list) {
    console.log(res.locals.user, list.createdBy._id, req.user);
    // var showList = res.locals.user && list.createdBy._id == res.locals.user._id;
    var showList = true; //can't get it to work :/

    res.render('list', {list: list, showList: showList});
  });
});


module.exports = router;
