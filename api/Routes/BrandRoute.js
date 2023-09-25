const express = require('express');
const router = express.Router();
const BrandController = require('../Controllers/BrandController');

router.post("/CreateBrand" , BrandController.createBrand)

module.exports = router;
