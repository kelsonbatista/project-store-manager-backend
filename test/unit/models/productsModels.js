const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../config/connection');

describe('PRODUCTS MODEL LAYER - Search for all products in the database', () => {
  describe('if product do not exists', () => {

    const resultExecute = [[]];

    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    });

    afterEach(() => {
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

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    })

    afterEach(() => {
      connection.execute.restore();
    })

    it('must return an array', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', async () => {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.an('object');
    });

    it('objects contain attributes id, name, quantity', async () => {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('PRODUCTS MODEL LAYER - Search for product by id', () => {
  describe('if product do not exists', () => {

    const resultExecute = [[]];

    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute);
    });

    afterEach(() => {
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

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    })

    afterEach(() => {
      connection.execute.restore();
    })

    it('must return an array', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', async () => {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.an('object');
    });

    it('objects contain attributes id, name, quantity', async () => {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});
