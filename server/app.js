// dependencies
const express = require('express');
// const routes = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { initializePassport } = require('./middleware/auth')

const app = express();

// parse json
app.use(bodyParser.json());

app.use(initializePassport)
app.use(cors())

app.use('/auth', require('./routes/auth'))
app.use('/bookmarks', require('./routes/bookmarks'))

// mongoose
mongoose.connect('mongodb://c-dawg-3000:5@X25xpj$XqPI$b@ds125851.mlab.com:25851/bookmarks-ca', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

// app.use('/', routes);

app.listen(process.env.PORT || 3000, () => console.log('Listening on http://localhost:3000'));
