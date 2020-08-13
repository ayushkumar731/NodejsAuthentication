const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 80;
const path = require('path');

const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub page of the layout
app.set('layout extractStyles',true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use express router
app.use('/', require('./routes'));



app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
