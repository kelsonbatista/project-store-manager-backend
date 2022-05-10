const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await productService.getAllProducts();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const result = await productService.getProductsById(req.params.id);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} = ${err.message}`);
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createProduct({ name, quantity });
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} = ${err.message}`);
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
