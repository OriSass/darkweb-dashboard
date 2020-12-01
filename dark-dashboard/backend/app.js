const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())
app.use('/api', require('./api'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


module.exports = app;