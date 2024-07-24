const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { getAllProductz, getProductzById } = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/productService');
const productsController = require('../../../src/controllers/productsController');

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
  it('deve criar um novo produto', async function () {
    const validname = 'joystick do flash';
    const mockValue = {
      id: 4,
      name: validname,
    };
    const req = {
      body: {
        name: 'joystick do flash',
      },
    };
    const res = {};
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    sinon.stub(productService, 'createProduct').resolves(mockValue);

    await productsController.postCreateProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);

    expect(res.json).to.have.been.calledWith(mockValue);
  });
  afterEach(function () {
    sinon.restore();
  });
});