const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controllers');

router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);

module.exports = router;
