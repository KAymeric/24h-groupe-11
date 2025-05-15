const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;
