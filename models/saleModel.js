const connection = require('../config/connection');

const getAllSales = () => {
  const query = 'SELECT * FROM sales';
  const result = connection.execute(query);
  return result;
};

const getSalesById = (id) => {
  const query = 'SELECT * FROM sales WHERE sales.id = ?';
  const result = connection.execute(query, [id]);
  if (!result.length) return null;
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
};
