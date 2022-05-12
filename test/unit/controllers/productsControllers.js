const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

// teste de req, res, next
describe('PRODUCTS CONTROLLER LAYER - Search for all products in the database', () => {
  describe('if product do not exists', () => {

    const resultExecute = [[]];
    const request = [];
    const response = [];

    // fazer stub da resposta que eu espero
    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      //simula o retorno do status e json
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'getAllProducts').resolves(resultExecute);
    });

    afterEach(() => {
      productService.getAllProducts.restore();
    })

    // é testado primeiramente em productController para simular uma req/res
    it('must return status code 200', async () => {
      // nao é salvo em variavel pois eu não quero o retorno, quero a propria execucao, a resposta direta
      await productController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('must return json with an array', async () => {
      await productController.getAllProducts(request, response);
      // testo se a resposta json corresponde a um array simulado pelo sinon
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
