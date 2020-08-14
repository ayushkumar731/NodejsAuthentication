const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStrore=require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);







//extract style and scripts from sub page of the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
  name: 'NodeAuth',

  //ToDo change the secret before deploment in production mode
  secret:'something',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: new MongoStrore({
    mongooseConnection:db,
    autoRemove:'disabled'
  },function(err){
    console.log(err|| 'connect mongodb setup ok');
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAunthenticatedUser);

//use express router
app.use('/', require('./routes'));



app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
