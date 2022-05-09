const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const result = await saleModel.getAllSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await saleModel.getSalesById(id);
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
};
