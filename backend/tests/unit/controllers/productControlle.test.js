const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { getAllProductz } = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/productService');
const { getProductzById } = require('../../../src/controllers/productsController');

chai.use(sinonChai);

describe('Realizando testes - Product Controller', function () {
  it('retorna todos os produtos', async function () {
    const products = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
    sinon.stub(productService, 'allproductz').resolves(products);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllProductz(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
  it('retornas um produto pelo id', async function () {
    const id = 1;
    const fakeProduct = { id, name: 'Product 1' };
    const req = { params: { id } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productService, 'productId').resolves(fakeProduct);
    await getProductzById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(fakeProduct);
  });
    
  afterEach(function () {
    sinon.restore();
  });
});