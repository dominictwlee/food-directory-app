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
    .then((user) => {
      const restaurantList = user.restaurants;
      console.log(user.restaurants[0].address[0])
      res.render('profile', { restaurantList } );
    })

});

profileRouter.post('/', authCheck, (req, res) => {
  const userQuery = { _user: req.user._id };
  Profile.findOne(userQuery)
    .then((doc) => {
      if (!doc) {
        const profile = new Profile({
          _user: req.user._id,
          restaurants: [req.body],
        });
        profile.save()
          .then((doc) => res.send(doc))
          .catch(err => res.sendStatus(400));
      } else {
        Profile.updateOne(userQuery, {$addToSet: { restaurants: req.body }})
          .then((result) => res.status(200).send(result))
          .catch(err => res.sendStatus(400));
      }
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    });
});

module.exports = profileRouter;
