const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  image: String,
  phone: String,
  reviews: String,
  price: String,
  rating: String,
  address: [String]
});

const profileSchema = new mongoose.Schema({
  _user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  restaurants: [restaurantSchema]
});

profileSchema.plugin(arrayUniquePlugin);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
