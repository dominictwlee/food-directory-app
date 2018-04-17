const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

//  Auth Login Page
authRouter.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

//  auth with google
authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

module.exports = authRouter;
