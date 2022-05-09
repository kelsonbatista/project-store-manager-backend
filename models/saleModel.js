const connection = require('../config/connection');

const getAllSales = async () => {
  const query = 'SELECT * FROM sales';
  const [result] = await connection.execute(query);
  return result;
};

const getSalesById = async (id) => {
  const query = 'SELECT * FROM sales WHERE sales.id = ?';
  const [result] = await connection.execute(query, [id]);
  if (!result.length) return null;
  return result[0];
};

module.exports = {
  getAllSales,
  getSalesById,
};
