const express = require('express');
const passport = require('passport');

const Restaurant = require('../models/restaurant');

const profileRouter = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

profileRouter.get('/', authCheck, (req, res) => {
  res.render('profile');
  console.log(req.user);
});

profileRouter.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.user);
  // const restaurant = new Restaurant({
  //   name: req.body.name,
  //   image: req.body.image,
  //   phone: req.body.phone,
  //   reviews: req.body.reviews,
  //   price: req.body.price,
  //   rating: req.body.rating,
  //   address: req.body.address,
  // });
  // restaurant.save()
  //   .then((doc) => res.send(doc));
  //   .catch((err) => res.status(400).send(err));
});

module.exports = profileRouter;
