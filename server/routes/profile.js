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
  res.render('profile');
  console.log(req.user);
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
          .catch(err => res.status(400).send(err));
      } else {
        Profile.updateOne(userQuery, {$addToSet: { restaurants: req.body }})
          .then((result) => res.send(res))
          .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(err));
});

module.exports = profileRouter;
