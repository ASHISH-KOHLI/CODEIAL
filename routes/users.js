const express =require('express');
const router = express.Router();
const passport = require('passport');

const usersController=require('../controllers/users_controller')

router.get('/profile/:id',passport.checkAuthentication,usersController.profile)
router.get('/SignUp',usersController.SignUp)
router.get('/SignIn',usersController.SignIn)

router.post('/create',usersController.create);

// use passport as a mddleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {
        failureRedirect:'/user/SignIn'
    },
),usersController.createSession);

router.get('/SignOut',usersController.destroySession)

module.exports = router;