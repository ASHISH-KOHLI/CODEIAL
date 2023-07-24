const express =require('express');
const router = express.Router();

const usersController=require('../controllers/users_controller')

router.get('/profile',usersController.profile)
router.get('/SignUp',usersController.SignUp)
router.get('/SignIn',usersController.SignIn)

router.post('/create',usersController.create);
router.post('/createSession',usersController.createSession);
module.exports = router;