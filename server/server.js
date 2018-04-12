const express = require('express');
const path = require('path')

require('dotenv').config();
require('./config/config');
const { apiRouter } = require('./api/search');

const app = express();
const port = process.env.PORT;

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bulma')));



app.get('/', (req, res) => res.sendFile('../public/index.html'));

// app.get('/api/search', (req, res) => res.send(req.query));

app.listen(port, () => console.log(`Server has started on port ${port}`));
