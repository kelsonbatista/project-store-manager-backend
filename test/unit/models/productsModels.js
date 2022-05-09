const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const sinon = require('sinon');
const connection = require('../../../config/connection');

describe('Search for all products in the database', () => {
  describe('if products do not exists', () => {

    const resultExecute = [[]];

    // sinon é responsável por criar um duble, simulação de dados
    before(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    })

    it('must return an array', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('the array must be empty', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe('if product exists', () => {

    const resultExecute = [{
      id: 1,
      name: 'Product1',
      quantity: 10
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    })

    after(() => {
      connection.execute.restore();
    })

    it('must return an array', async () => {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('object');
    });

    if('objects contain attributes id, name, quantity', () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});
