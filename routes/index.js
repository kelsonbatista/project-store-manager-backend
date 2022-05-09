const express = require('express');
const productRouter = require('./productRouter');
const saleRouter = require('./saleRouter');

const router = express.Router();

router.use('./products', productRouter);
router.use('./sales', saleRouter);

module.exports = router;
