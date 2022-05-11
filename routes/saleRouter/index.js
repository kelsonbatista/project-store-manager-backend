const express = require('express');
const saleController = require('../../controllers/saleController');
const validateSale = require('../../middlewares/validateSaleMiddleware');

const saleRouter = express.Router();

saleRouter.get('/', saleController.getAllSales);

saleRouter.get('/:id', saleController.getSalesById);

saleRouter.post('/', validateSale, saleController.createSaleProduct);

saleRouter.put('/:id', validateSale, saleController.updateSaleProduct);

saleRouter.delete('/:id', saleController.deleteSaleProduct);

module.exports = saleRouter;
