const express = require('express');
const router = express.Router();
const BrandController = require('../Controllers/BrandController');

// Define routes for your functions
router.post('/createBrandData', BrandController.createBrandData);
router.post('/validateEmail', BrandController.validateEmailAndSendToken);
router.post('/verifyPin', BrandController.getBrandByEmail);


module.exports = router;
