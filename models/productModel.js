const connection = require('../config/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const result = await connection.execute(query);
  return result;
};

module.exports = {
  getAllProducts,
};
