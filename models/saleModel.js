const { StatusCodes } = require('http-status-codes');
const connection = require('../config/connection');

const getAllSales = async () => {
  const query = (`
  SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity AS quantity, sa.date AS date
  FROM sales_products AS sp
  JOIN sales AS sa
  ON sp.sale_id = sa.id
  `);
  const [result] = await connection.execute(query);
  return result;
};

const getSalesById = async (id) => {
  const query = (`
  SELECT sa.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM sales_products AS sp
  JOIN sales AS sa
  ON sp.sale_id = sa.id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id, productId
  `);
  const [result] = await connection.execute(query, [id]);
  if (!result.length) {
    const error = { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
    throw error;
  }
  return result;
};

const createSale = async () => {
  const query = ('INSERT INTO sales (date) VALUES (NOW())');
  // const date = Date.now().toISOString();
  const [result] = await connection.execute(query);
  return result.insertId;
};

const createSaleProduct = async (productId, quantity) => {
  const saleId = await createSale();
  const query = ('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)');
  await connection.execute(query, [saleId, productId, quantity]);
  return {
    saleId,
    productId,
    quantity,
  };
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  createSaleProduct,
};
