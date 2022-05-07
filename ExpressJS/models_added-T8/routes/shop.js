const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');
const productController=require('../controllers/product.js')

const router = express.Router();

router.get('/',productController.getProduct );

module.exports = router;
