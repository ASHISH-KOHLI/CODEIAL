const express =require('express');
const router = express.Router();
const passport = require('passport');

const usersController=require('../controllers/users_controller')

router.get('/profile/:id',passport.checkAuthentication,usersController.profile)
router.post('/update/:id',passport.checkAuthentication,usersController.update)

router.get('/SignUp',usersController.SignUp);

router.post('/create',usersController.create);

router.get('/SignIn',usersController.SignIn);


// use passport as a mddleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {
        failureRedirect:'/user/SignIn'
    },
),usersController.createSession);

router.get('/SignOut',usersController.destroySession)

router.get('/auth/google', passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession)

module.exports = router;