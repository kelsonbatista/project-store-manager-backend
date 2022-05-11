const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const getAllSales = async (req, res, next) => {
  try {
    const result = await saleService.getAllSales();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const getSalesById = async (req, res, next) => {
  try {
    const result = await saleService.getSalesById(req.params.id);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const createSaleProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const result = await saleService.createSaleProduct(productId, quantity);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const updateSaleProduct = async (req, res, next) => {
  try {
    const { saleId, productId, quantity } = req.body;
    const result = await saleService.updateSaleProduct(saleId, productId, quantity);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSaleProduct,
  updateSaleProduct,
};
