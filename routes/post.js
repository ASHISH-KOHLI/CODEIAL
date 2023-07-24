const express = require('express');
const router = express.Router();

const postController= require('../controllers/post_controller')
router.get('/myPost',postController.myPost)



module.exports=router;