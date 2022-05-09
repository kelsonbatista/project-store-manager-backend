const saleModel = require('../models/saleModel');

const getAllSales = () => {
  const result = saleModel.getAllSales();
  return result;
};

const getSalesById = (id) => {
  const result = saleModel.getSalesById(id);
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
};
