const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');

// teste de req, res, next
describe('2.1) SALES CONTROLLER LAYER - Search for all sales in the database', () => {
  describe('if sale do not exists', () => {

    const resultExecute = [[]];
    const request = [];
    const response = [];

    // fazer stub da resposta que eu espero
    // sinon é responsável por criar um duble, simulação de dados
    beforeEach(() => {
      //simula o retorno do status e json
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAllSales').resolves(resultExecute);
    });

    afterEach(() => {
      saleService.getAllSales.restore();
    })

    // é testado primeiramente em productController para simular uma req/res
    it('must return status code 200', async () => {
      // nao é salvo em variavel pois eu não quero o retorno, quero a propria execucao, a resposta direta
      await saleController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('must return json with an array', async () => {
      await saleController.getAllSales(request, response);
      // testo se a resposta json corresponde a um array simulado pelo sinon
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
