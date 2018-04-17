const mongoose = require('mongoose');
// const arrayUniquePlugin = require('mongoose-unique-array');

const restaurantSchema = new mongoose.Schema({
  _user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  restaurants: [{
    _id: false,
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
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
      unique: true,
      required: true,
    },
  }],
});

// restaurantSchema.plugin(arrayUniquePlugin);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
