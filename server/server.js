const express = require('express');
var hbs  = require('hbs');
const path = require('path')
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const browserSync = require('browser-sync');

require('dotenv').config();
require('./config/config');
const { apiRouter } = require('./api/search');
const { router } = require('./routes');

const app = express();
const port = process.env.PORT;

//  Browser-sync config
function listening () {
  browserSync({
    proxy: `localhost:${port}`,
    files: ['public/**/*.{js,css,html}', 'views/**/*.hbs'],
    open: false
  });
  console.log(`Server has started on port ${port}`)
}

//  Setup MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
  .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine', 'hbs');

//  passport configs
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require('./routes.js')(app, passport);

app.use('/api', apiRouter);
app.use('/', router);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bulma')));

// app.get('/api/search', (req, res) => res.send(req.query));

app.listen(port, listening);
