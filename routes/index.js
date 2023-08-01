const express = require('express');

const router =express.Router();
const homeController =require('../controllers/home_controller')
console.log('routes loaded');

router.get('/',homeController.home)
router.use('/users',require('./users'))
// for any other routes acces from here
// router.use('/routername' , require('./routerfile'));
router.use('/posts',require('./posts'));
module.exports=router;