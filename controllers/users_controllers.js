const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
module.exports.profile = function (req, res) {
  return res.render('profile', {
    title: 'profile page',
  });
};

function validatePassword(password) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
  return re.test(password);
}

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('signUp', {
    title: 'SignUp Page',
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('signIn', {
    title: 'SignIn Page',
  });
};

//get the sign-up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.render('signup', {
      title: 'SignUp Page',
      err: 'Password and Confirm password Should be match',
    });
  }

  const password = req.body.password;
  if (!validatePassword(password)) {
    return res.render('signup', {
      title: 'SignUp Page',
      err: 'Password must be valid ',
    });
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding user in sign up');
      return;
    }

    if (!user) {
      bcrypt.hash(req.body.password, 11, function (err, hash) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
      });

      return res.redirect('/users/sign-in');
    } else {
      return res.render('./signup', {
        err: 'User Already Exists',
        title: 'SignUp Page',
      });
    }
  });
};

//sign in and create a session for a user
module.exports.createSession = function (req, res) {
  return res.redirect('/users/profile');
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect('/');
};
