const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('5.1) PRODUCTS SERVICES LAYER - Search for all products in the database', () => {
  describe('if product do not exists', () => {

    const resultExecute = [];

    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      sinon.stub(productModel, 'getAllProducts').resolves([]);
    })

    afterEach(() => {
      productModel.getAllProducts.restore();
    })

    it('must return an array', async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('the array must be empty', async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe('if product exists', () => {

    const resultExecute = [{
      id: 1,
      name: 'Product1',
      quantity: 10
    }]
    // agora sao dados de productModel, o Service não faz conexao com o banco
    beforeEach(() => {
      sinon.stub(productModel, 'getAllProducts').resolves(resultExecute);
    })

    afterEach(() => {
      productModel.getAllProducts.restore();
    })

    it('must return an array', async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', async () => {
      const result = await productService.getAllProducts();
      expect(result[0]).to.be.an('object');
    });

    it('objects contain attributes id, name, quantity', async () => {
      const result = await productService.getAllProducts();
      expect(result[0]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('5.2) PRODUCTS SERVICES LAYER - Search for products by id', () => {
  describe('if product do not exists', () => {

    const resultExecute = [[]];

    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      sinon.stub(productModel, 'getProductsById').resolves(resultExecute);
      // https://stackoverflow.com/questions/47029151/how-to-mock-variable-with-sinon-mocha-in-node-js
      // sinon.stub(resultExecute, 'id').get(() => 11);
    })

    afterEach(() => {
      productModel.getProductsById.restore();
    })

    it('must return an array', async () => {
      const result = await productService.getProductsById(11);
      expect(result).to.be.an('array');
    });

    it('the array must be empty', async () => {
      const result = await productService.getProductsById(11);
      expect(result).to.be.empty;
    });
  });

  describe('if product exists', () => {

    const resultExecute = [[{
      id: 1,
      name: 'Product1',
      quantity: 10
    }]]
    // agora sao dados de productModel, o Service não faz conexao com o banco
    beforeEach(() => {
      sinon.stub(productModel, 'getProductsById').resolves(resultExecute);
    })

    afterEach(() => {
      productModel.getProductsById.restore();
    })

    it('must return an array', async () => {
      const result = await productService.getProductsById(1);
      expect(result).to.be.an('array');
    });

    it('the array must be not empty', async () => {
      const result = await productService.getProductsById(1);
      expect(result).to.be.not.empty;
    });

    it('the array contain objects', async () => {
      const result = await productService.getProductsById(1);
      expect(result[0]).to.be.an('object');
    });

    it('objects contain attributes id, name, quantity', async () => {
      const result = await productService.getProductsById(1);
      expect(result[0]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});
