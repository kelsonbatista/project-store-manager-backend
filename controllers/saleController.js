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

module.exports = {
  getAllSales,
  getSalesById,
};
