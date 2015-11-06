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

module.exports = router;
