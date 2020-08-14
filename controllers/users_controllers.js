const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.profile = function (req, res) {
  return res.render('profile', {
    title: 'profile page',
  });
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
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
  const email = req.body.email;
  if (!validateEmail(email)) {
    return res.render('signup', {
      err: 'Enter a valid email',
      title: 'SignUp Page',
    });
  }

  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  const password = req.body.password;
  if (!validatePassword(password)) {
    return res.render('signup', {
      err: 'Password must be valid ',
      title: 'SignUp Page',
    });
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding user in sign up');
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('error in creating user while sign up');
          return;
        }
        return res.redirect('/users/sign-in');
      });
    } else {
      return res.redirect('back');
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
