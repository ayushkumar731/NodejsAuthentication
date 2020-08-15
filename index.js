const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 80;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStrore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');

//to use sass middleware
app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

//to use the assets folder
app.use(express.static('./assets'));

//to use the indivisual layouts
app.use(expressLayouts);

//extract style and scripts from sub page of the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'NodeAuth',

    //ToDo change the secret before deploment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStrore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect mongodb setup ok');
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAunthenticatedUser);

//for flash noto
app.use(flash());
app.use(customMiddleWare.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
