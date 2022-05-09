const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../config/connection');

describe('Search for all sales in the database', () => {
  describe('if sales do not exists', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('must return an array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an('array');
    });

    it('must return empty array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.empty;
    });
  });

  describe('if sales exists', () => {

    const resultExecute = [{
      id: 1,
      date: '2022/05/10'
    }]

    before(() => {
      sinon.stub(connection, 'execute').restore(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('must return an array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an('array');
    });

    it('must return a not empty array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.not.empty;
    });

    it('must contain objects in the array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an('object');
    });

    it('must contain attributes id, date', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.includes.all.keys('id', 'date');
    });
  })
});
