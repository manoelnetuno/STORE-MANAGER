const { expect } = require('chai');
const sinon = require('sinon');
const { getAllProductz } = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/productService');

describe('Realizando testes - Product Controller', function () {
  it('retorna todos os produtos', async function () {
    const products = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
    sinon.stub(productService, 'getAllProdcuts').resolves(products);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
       
    await getAllProductz(req, res);
    
    expect(res.status).to.be.calledWith('200');
    expect(res.json).to.be.deep.equal(products);
  });
    
  afterEach(function () {
    sinon.restore();
  });
});