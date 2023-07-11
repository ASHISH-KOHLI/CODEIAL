const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
// const { route } = require('./users');

router.get('/profile', userController.profile);


router.get('/sign_up',userController.signUp);
router.get('/sign_in',userController.signIn);


router.post('/create', userController.create);


module.exports = router;