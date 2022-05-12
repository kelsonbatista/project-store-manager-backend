const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe('6.1) SALES SERVICES LAYER - Search for all sales in the database', () => {
  describe('if sales do not exists', () => {

    const resultExecute = [[]];

    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      sinon.stub(saleModel, 'getAllSales').resolves([]);
    })

    afterEach(() => {
      saleModel.getAllSales.restore();
    })

    it('must return an array', async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.an('array');
    });

    it('the array must be empty', async () => {
      const result = await saleService.getAllSales();
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
      sinon.stub(saleModel, 'getAllSales').resolves(resultExecute);
    })

    afterEach(() => {
      saleModel.getAllSales.restore();
    })

    it('must return an array', async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', async () => {
      const result = await saleService.getAllSales();
      expect(result[0]).to.be.an('object');
    });

    it('objects contain attributes saleId, productId, quantity, date', async () => {
      const result = await saleService.getAllSales();
      expect(result[0]).to.have.all.keys('saleId', 'productId', 'quantity', 'date');
    });
  });
});
