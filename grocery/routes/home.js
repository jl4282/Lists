var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db');
var passport = require('passport');
var List = mongoose.model('List');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (res.locals.user){
    res.redirect('/lists');
  }
  else{
    res.render('getStarted');
  }
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/lists');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}),
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/lists');
      });
    }
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
