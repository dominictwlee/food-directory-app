const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  address: {
    type: [String],
    required: true,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
