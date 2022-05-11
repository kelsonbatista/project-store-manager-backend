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
    const result = await saleService.createSaleProduct(req.body);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const updateSaleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const result = await saleService.updateSaleProduct(id, productId, quantity);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(`Error Status ${err.status} - ${err.message}`);
    next(err);
  }
};

const deleteSaleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await saleService.deleteSaleProduct(id);
    return res.status(StatusCodes.NO_CONTENT).json(result);
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
  deleteSaleProduct,
};
