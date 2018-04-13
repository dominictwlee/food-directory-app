const express = require('express');
const request = require('request-promise-native');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/login', (req, res) => res.send('login'));
router.get('/signup', (req, res) => res.send('signup'));

module.exports = { router };
