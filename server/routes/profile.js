const express = require('express');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;

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

profileRouter.post('/', authCheck, (req, res) => {
  // console.log(req.body);
  // console.log(req.user._id);
  const userQuery = { _user: req.user._id };

  Restaurant.findOne(userQuery)
    .then((doc) => {
      if (!doc) {
        const restaurant = new Restaurant({
          _user: req.user._id,
          restaurants: [req.body],
        });
        restaurant.save()
          .then((doc) => res.send(doc))
          .catch(err => res.status(400).send(err));
      } else {
        Restaurant.updateOne(userQuery, {$addToSet: { restaurants: req.body }})
          .then((res) => console.log(res));

      }
    })
});

module.exports = profileRouter;
