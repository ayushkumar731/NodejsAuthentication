const express = require("express");
const router = express.Router();

const userController = require("../controllers/users_controllers");

router.get("/create", userController.signUp);
module.exports = router;
