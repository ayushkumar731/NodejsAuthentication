const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      //find user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log('error in finding the iser== parssport');
          return done(err);
        }
        //if user is not found then show invalid message
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        //decrypt the password and match the result
        bcrypt.compare(password, user.password, function (err, result) {
          //if not match then show invalid message
          if (!result) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          //if everything fine then send the data
          return done(null, user);
        });
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('error in finding user--->Passport');
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is auntheticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then pass on the request tothe next unction(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect('/users/sign-in');
};

passport.setAunthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are just sending tothe locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
