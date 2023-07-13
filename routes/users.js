const express = require('express');
const router = express.Router();
const passport = require('passort');
const userController = require('../controllers/users_controller');

// const { route } = require('./users');

router.get('/profile',passport.checkAuthentication, userController.profile);


router.get('/sign_up',userController.signUp);
router.get('/sign_in',userController.signIn);


router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);




module.exports = router;