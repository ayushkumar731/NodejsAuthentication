const express = require('express');
const router = express.Router();

//access the file from home controller
const homeController = require('../controllers/home_controller');

//to get rquest
router.get('/', homeController.home);

//to use another router file
router.use('/users', require('./user'));

//exports the router
module.exports = router;
