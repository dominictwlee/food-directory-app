const express = require('express');
const hbs  = require('hbs');
const path = require('path')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const browserSync = require('browser-sync');
const cookieSession = require('cookie-session');

require('dotenv').config();
require('./config/config');
const passportConfig = require('./config/passport');
const authRouter = require('./auth/routes');
const apiRouter = require('./api/search');
const profileRouter = require('./profile/routes');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bulma')));

//  Browser-sync config
function listening () {
  browserSync({
    proxy: `localhost:${port}`,
    files: ['public/**/*.{js,css}', 'views/**/*.hbs'],
    open: false,
    notify: false,

  });
  console.log(`Server has started on port ${port}`)
}

//  Setup View Engine
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  Setup MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
  res.send
  res.render('index', { user: req.user })
});

app.listen(port, listening);
