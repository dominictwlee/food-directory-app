const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  _id: false,
  name: String,
  image: String,
  phone: String,
  reviews: String,
  price: String,
  rating: String,
  address: [String],
})

const profileSchema = new mongoose.Schema({
  _user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  restaurants: [restaurantSchema],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
