var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  List.findOneAndUpdate(
    {slug: req.body.slug},
    {$push: {items: {name: req.body.name, quantity: req.body.quantity, checked: false}}},
    function(err, list, count) {
      if (!err){
        res.redirect('../list/' + list.slug);
      }
      else {
        console.log('Error updating list');
      }
  });
});

router.post('/check', function(req, res, next) {
  List.findOne({slug:req.body.slug}, function(err, list, count) {
    if (req.body.checked instanceof Array){
      req.body.checked.forEach(function(index){
        list.items[index].checked = true;
      });
    }
    else{
      list.items[req.body.checked].checked = true;
    }
    list.markModified('toppings');
    list.save(function(err, modifiedList, count) {
      console.log(err, modifiedList);
      res.redirect('../list/' + list.slug);
    });
  });
});

module.exports = router;
