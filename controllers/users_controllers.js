//require user models
const User = require('../models/user');

//to use for the ecrypted password
const bcrypt = require('bcrypt');

//to use for the authentication
const passport = require('passport');
const mongoose = require('mongoose');

//render the profile page
module.exports.profile = function (req, res) {
  return res.render('profile', {
    title: 'profile page',
  });
};

//valid password required from the user
function validatePassword(password) {
  const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
  return pattern.test(password);
}

//render sign up pagge
module.exports.signUp = function (req, res) {
  // if user is authenticated then redirect to the profile page
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  //if user is not authenticated then render the sign-up page
  return res.render('signUp', {
    title: 'SignUp Page',
  });
};

//render sign in page
module.exports.signIn = function (req, res) {
  // if user is authenticated then redirect to the profile page
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  //if user is not authenticated then render the sign-in page
  return res.render('signIn', {
    title: 'SignIn Page',
  });
};

//get the sign-up data
module.exports.create = function (req, res) {
  //if password and confirm password not matched then render the sign-up page
  if (req.body.password != req.body.confirm_password) {
    return res.render('signup', {
      title: 'SignUp Page',
      err: 'Password and Confirm password Should be match',
    });
  }

  //check password is valid or not
  const password = req.body.password;
  if (!validatePassword(password)) {
    //if not valid then render the signup page and diplay the error
    return res.render('signup', {
      title: 'SignUp Page',
      err: 'Password must be valid ',
    });
  }

  //check the database with the email
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding user in sign up');
      return;
    }

    //if user is not found in database then create the user and redirect to the sign-in page
    if (!user) {
      //user hash to encrypt the password
      bcrypt.hash(req.body.password, 11, function (err, hash) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
      });

      return res.redirect('/users/sign-in');
    } else {
      //if user is found in database then render the sign up page with display the error
      return res.render('./signup', {
        err: 'User Already Exists',
        title: 'SignUp Page',
      });
    }
  });
};

//if user wants to update the password
module.exports.update = function (req, res) {
  //decrpt the pass which is in dabase and match with the current password
  bcrypt.compare(req.body.curr_password, req.user.password, function (err, result) {
    //if password not match then display the error with the help of noty and redirct to profile page
    if (!result) {
      req.flash('error', 'current password is wrong');
      return res.redirect('back');
    } else {
      //now check the new password and confirm password is same or not
      if (req.body.password != req.body.new_password) {
        //if not then display error and redict the profile page
        req.flash('error', 'new password and confirm password must be same !');
        return res.redirect('back');
      }

      //check the validation of password
      const password = req.body.password;
      if (!validatePassword(password)) {
        //if not validate then display the error and redirect toh the same page
        req.flash('error', 'Password must be valid');
        return res.redirect('back');
      }
      //and using bcrypt to encrypt the password if above is right
      bcrypt.hash(req.body.password, 11, function (err, hash) {
        mongoose.set('useFindAndModify', false);
        //update password and diplay success notification
        User.findByIdAndUpdate(req.user._id, { password: hash }, function (err, user) {
          req.flash('success', 'Password Successfully Changed');
          return res.redirect('back');
        });
      });
    }
  });
};

//create a session for a user and redirect to the profile page
module.exports.createSession = function (req, res) {
  return res.redirect('/users/profile');
};

//destroy sesion for the logout
module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect('/');
};
