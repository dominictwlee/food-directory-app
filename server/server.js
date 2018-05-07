const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/config');
const passportConfig = require('./config/passport');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api/search');
const profileRouter = require('./routes/profile');

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bulma')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Setup View Engine
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  Setup MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

//  Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.get('/', (req, res) => res.render('index', { user: req.user }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).send({ error: err });
});

app.listen(port);
