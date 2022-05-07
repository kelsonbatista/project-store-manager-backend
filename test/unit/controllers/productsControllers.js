const { expect } = require('chai');
const productModel = require('../models/productsModels');
const sinon = require('sinon');
const connection = require('../models/connection');

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
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array must be empty', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('if product exists', () => {
    it('must return an array', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.not.empty;
    });
  });
});

