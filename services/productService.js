const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const getProductsById = async (id) => {
  const result = await productModel.getProductsById(id);
  return result;
};

const createProduct = async (name, quantity) => {
  const result = await productModel.createProduct(name, quantity);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await productModel.updateProduct(id, name, quantity);
  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
};
