const connection = require('../config/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const result = await connection.execute(query);
  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM products WHERE products.id = ?';
  const result = await connection.execute(query, [id]);
  if (!result.length) return null;
  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
};
