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
    const result = await productService.createProduct(name, quantity);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} = ${err.message}`);
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productService.updateProduct(id, name, quantity);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    return res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
