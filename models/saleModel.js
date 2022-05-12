const connection = require('../config/connection');
const productModel = require('./productModel');

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
  return result;
};

const createSaleProduct = async (newId, newProductId, newQuantity) => {
  // const id = await createSale();
  const query = ('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)');
  await connection.execute(query, [newId, newProductId, newQuantity]);
  const product = await productModel.getProductsById(newProductId);
  const { id, name, quantity } = product[0];
  await productModel.updateProduct(id, name, quantity - newQuantity);
  return {
    productId: newProductId,
    quantity: newQuantity,
  };
};

const updateSale = async (id) => {
  const query = 'UPDATE sales SET date = NOW() WHERE id = ?';
  const result = await connection.execute(query, [id]);
  return result;
};

const updateSaleProduct = async (newId, newProductId, newQuantity) => {
  await updateSale(newId);
  const query = `
  UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?
  `;
  await connection.execute(query, [newProductId, newQuantity, newId]);
  const product = await productModel.getProductsById(newProductId);
  const { id, name } = product[0];
  await productModel.updateProduct(id, name, newQuantity);
  return {
    saleId: id,
    itemUpdated: [
      {
        productId: newProductId,
        quantity: newQuantity,
      },
    ],
  };
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const result = await connection.execute(query, [id]);
  return result;
};

const deleteSaleProduct = async (newId) => {
  const sale = await getSalesById(newId);
  const newProductId = sale[0].productId;
  const newQuantity = sale[0].quantity;
  const product = await productModel.getProductsById(newProductId);
  const { id, name, quantity } = product[0];
  await productModel.updateProduct(id, name, quantity + newQuantity);
  await deleteSale(newId);
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  const result = connection.execute(query, [newId]);
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSaleProduct,
  updateSale,
  updateSaleProduct,
  deleteSaleProduct,
};
