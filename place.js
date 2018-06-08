var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  name: String,
  comment: String,
  rating: Number
});

var PlaceSchema = new Schema({
    name: String,
    description: String,
    country: String,
    categories: [],
    createdAt : {type: Date, default: Date.now},
    review: [reviewSchema]
});



module.exports = mongoose.model('Place', PlaceSchema);


