const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../config/connection');

describe('4.1) SALES MODEL LAYER - Search for all sales in the database', () => {
  describe('if sales do not exists', () => {

    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    afterEach(() => {
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
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2022/05/10'
    }];

    // agora sao dados de saleModel, o Service não faz conexao com o banco
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    afterEach(() => {
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
      expect(result[0]).to.be.an('object');
    });

    it('must contain attributes saleId, productId, quantity, date', async () => {
      const result = await saleModel.getAllSales();
      expect(result[0]).to.have.all.keys('saleId', 'productId', 'quantity', 'date');
    });
  })
});

describe('4.2) SALES MODEL LAYER - Search for product by id', () => {
  describe('if sales do not exists', () => {

    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('must return an array', async () => {
      const result = await saleModel.getSalesById();
      expect(result).to.be.an('array');
    });

    it('must return empty array', async () => {
      const result = await saleModel.getSalesById();
      expect(result).to.be.empty;
    });
  });

  describe('if sales exists', () => {

    const resultExecute = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ];

    // agora sao dados de saleModel, o Service não faz conexao com o banco
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('must return an array', async () => {
      const result = await saleModel.getSalesById();
      expect(result).to.be.an('array');
    });

    it('must return a not empty array', async () => {
      const result = await saleModel.getSalesById();
      expect(result).to.be.not.empty;
    });

    it('must contain objects in the array', async () => {
      const result = await saleModel.getSalesById();
      expect(result[0]).to.be.an('object');
    });

    it('must contain attributes date, productId, quantity', async () => {
      const result = await saleModel.getSalesById();
      expect(result[0]).to.have.all.keys('date', 'productId', 'quantity');
    });
  })
});
