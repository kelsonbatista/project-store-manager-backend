const { StatusCodes } = require('http-status-codes');
const connection = require('../config/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);
  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM products WHERE products.id = ?';
  const [result] = await connection.execute(query, [id]);
  if (!result.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Product not found' };
    throw error;
  }
  return result[0];
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  const query = `
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?
  `;
  await connection.execute(query, [name, quantity, id]);
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
};
