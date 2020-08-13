const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 80;
const path = require('path');

const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

//use express router
app.use('/', require('./routes'));



app.use(cookieParser());


app.use(express.static('./assets'));
app.use(expressLayouts);

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
