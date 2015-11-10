var mongoose = require('mongoose'),
  URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');


// my schema goes here!
var Item = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean
});

var List = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [Item]
});
List.plugin(URLSlugs('name'));

var User = new mongoose.Schema({
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

User.plugin(passportLocalMongoose);

mongoose.model('List', List);
mongoose.model('Item', Item);
mongoose.model('User', User);

mongoose.connect('mongodb://localhost/grocerydb');
