const express = require('express');
const router = express.Router();
const passport = require('passport');

//access user controller
const userController = require('../controllers/users_controllers');

//to send the get request while signup
router.get('/sign-up', userController.signUp);

//to send the get request while signin
router.get('/sign-in', userController.signIn);

//to send the get request while open profile
router.get('/profile', passport.checkAuthentication, userController.profile);

//to send the get request while signout
router.get('/sign-out', userController.destroySession);

//to send the post request while signup
router.post('/create', userController.create);

//to send the post request while update
router.post('/update/:id', passport.checkAuthentication, userController.update);

//to send the post request while create-session
router.post(
  '/create-session',
  passport.authenticate('local', {
    //if the user has not provide the right info then redirect to the sign in page
    failureRedirect: '/users/sign-in',

    //flash the notification
    failureFlash: 'Invalid username or password.',
  }),
  userController.createSession
);

//to use the google outh
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/users/sign-in',
    failureFlash: 'Invalid ,Please try again',
  }),
  userController.createSession
);

//exports the router
module.exports = router;
