var mongoose = require('mongoose'),
  URLSlugs = require('mongoose-url-slugs');


// my schema goes here!
var List = new mongoose.Schema({
  name: String,
  createdBy: String,
  items: [Item]
});
List.plugin(URLSlugs('name createdBy'));

var Item = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean
});

mongoose.model('List', List);
mongoose.model('Item', Item);

mongoose.connect('mongodb://localhost/grocerydb');
