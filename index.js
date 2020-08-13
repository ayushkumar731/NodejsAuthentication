const express = require('express');
const port = 80;
const path = require('path');
const db = require('./config/mongoose');
const app = express();
const User = require('./models/user');

//use express router
app.use('/', require('./routes'));

app.use(express.urlencoded());

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
