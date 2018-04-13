const express = require('express');
const request = require('request-promise-native');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/login', (req, res) => res.send('login'));
router.post('/login', (req, res) => res.send('login'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', (req, res) => res.render('signup'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/logout', (req, res) => res.send('logout'));

module.exports = { router };
