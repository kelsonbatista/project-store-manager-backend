const express = require('express');
const productController = require('../../controllers/productController');
const validateProduct = require('../../middlewares/validateProductMiddleware');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProductsById);

productRouter.post('/', validateProduct, productController.createProduct);

productRouter.put('/:id', validateProduct, productController.updateProduct);

module.exports = productRouter;
