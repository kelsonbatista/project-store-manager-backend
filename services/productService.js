const { StatusCodes } = require('http-status-codes');
const productModel = require('../models/productModel');
const connection = require('../config/connection');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const getProductsById = async (id) => {
  const result = await productModel.getProductsById(id);
  if (!result.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Product not found' };
    throw error;
  }
  return result[0];
};

const checkProductName = async (name) => {
  const query = 'SELECT name FROM products WHERE name = ?';
  const [result] = await connection.execute(query, [name]);
  return result;
};

const createProduct = async (name, quantity) => {
  const check = await checkProductName(name);
  if (check.length) {
    const error = { status: StatusCodes.CONFLICT, message: 'Product already exists' };
    throw error;
  }
  const result = await productModel.createProduct(name, quantity);
  return result;
};

const checkProductId = async (id) => {
  const query = 'SELECT name FROM products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const check = await checkProductId(id);
  if (!check.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Product not found' };
    throw error;
  }
  const result = await productModel.updateProduct(id, name, quantity);
  return result;
};

const deleteProduct = async (id) => {
  const check = await checkProductId(id);
  if (!check.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Product not found' };
    throw error;
  }
  const result = await productModel.deleteProduct(id);
  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
