const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
});

passport.use(
  new GoogleStrategy({
    //  options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in DB
    User.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if (currentUser) {
          return done(null, currentUser)
        }
        const user = new User({
          googleId: profile.id,
          username: profile.displayName,
        });
        user.save()
          .then(newUser => {
            console.log(newUser)
            done(null, newUser);
          })
      })
      .catch(err => console.log(err));
  })
);
