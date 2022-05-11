const { StatusCodes } = require('http-status-codes');
const saleModel = require('../models/saleModel');
const connection = require('../config/connection');

const getAllSales = async () => {
  const result = await saleModel.getAllSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await saleModel.getSalesById(id);
  return result;
};

const createSaleProduct = async (productId, quantity) => {
  const result = await saleModel.createSaleProduct(productId, quantity);
  return result;
};

const checkSaleProductId = async (id) => {
  const query = 'SELECT sale_id FROM sales_products WHERE sale_id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const updateSaleProduct = async (saleId, productId, quantity) => {
  const check = await checkSaleProductId(saleId);
  if (!check.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
    throw error;
  }
  const result = await saleModel.updateSaleProduct(saleId, productId, quantity);
  return result;
};

const deleteSaleProduct = async (id) => {
  const check = await checkSaleProductId(id);
  if (!check.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
    throw error;
  }
  const result = await saleModel.deleteSaleProduct(id);
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSaleProduct,
  updateSaleProduct,
  deleteSaleProduct,
};
