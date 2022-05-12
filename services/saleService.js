const { StatusCodes } = require('http-status-codes');
const saleModel = require('../models/saleModel');
const connection = require('../config/connection');
const { checkLengthQuantity } = require('../middlewares/validateProductMiddleware');

const getAllSales = async () => {
  const result = await saleModel.getAllSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await saleModel.getSalesById(id);
  if (!result.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
    throw error;
  }
  return result;
};

const checkSaleId = async (id) => {
  const query = 'SELECT sale_id FROM sales_products WHERE sale_id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const checkProductId = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [result] = await connection.execute(query, [productId]);
  return result;
};

const createSale = async () => {
  const query = ('INSERT INTO sales (date) VALUES (NOW())');
  // const date = Date.now().toISOString();
  const [result] = await connection.execute(query);
  return result.insertId;
};

const createSaleProduct = async (reqBody) => {
  const id = await createSale();
  const sales = await Promise.all(reqBody.map(async ({ productId, quantity }) => {
    const checkProduct = await checkProductId(productId);
    await checkLengthQuantity(checkProduct, productId, quantity);
    const sale = await saleModel.createSaleProduct(id, productId, quantity);
    return sale;
  }));
  return {
    id,
    itemsSold: sales,
  };
};

const updateSaleProduct = async (id, productId, quantity) => {
  const checkSale = await checkSaleId(id);
  if (!checkSale.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
    throw error;
  }
  const checkProduct = await checkProductId(productId);
  if (!checkProduct.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Product does not exist' };
    throw error;
  }
  const result = await saleModel.updateSaleProduct(id, productId, quantity);
  return result;
};

const deleteSaleProduct = async (id) => {
  const check = await checkSaleId(id);
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
