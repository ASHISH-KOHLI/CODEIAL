const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);

router.use('/users', require('./users'));


//for ant further routes access from here
// routes.use('/routerName' , require('./routerfile));

module.exports = router;