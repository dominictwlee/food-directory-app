const express = require('express');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;

const Profile = require('../models/profile');

const profileRouter = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

profileRouter.get('/', authCheck, (req, res) => {
  Profile.findOne({ _user: req.user._id })
    .then(user => {
      if (user) {
        const restaurantList = user.restaurants;
        const address = user.restaurants.address;
        res.render('profile', { restaurantList, address });
      } else {
        res.render('profile');
      }
    })
    .catch(err => res.status(400).send(err));
});

profileRouter.post('/', authCheck, (req, res, next) => {
  //  Find user profile
  Profile.findOne({ _user: req.user._id })
    .then(doc => {
      if (!doc) {
        //  Create profile if it doesn't exist
        Profile.create({ _user: req.user._id, restaurants: [req.body] })
          .then(result => res.status(200).json(result))
          .catch(next);
      } else {
        //  Update profile with new restaurant
        doc.restaurants = doc.restaurants.concat([req.body]);
        doc
          .save()
          .then(result => res.status(200).send(result))
          .catch(next);
      }
    })
    .catch(next);
});

profileRouter.delete('/:id', authCheck, (req, res) => {
  Profile.findOneAndUpdate(
    { 'restaurants._id': req.params.id },
    {
      $pull: { restaurants: { _id: req.params.id } }
    },
    { new: true }
  )
    .then(doc => res.redirect('/profile'))
    .catch(err => console.log(err));
});

module.exports = profileRouter;
