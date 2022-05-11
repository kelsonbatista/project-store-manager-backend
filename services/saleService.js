const saleModel = require('../models/saleModel');

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

module.exports = {
  getAllSales,
  getSalesById,
  createSaleProduct,
};
