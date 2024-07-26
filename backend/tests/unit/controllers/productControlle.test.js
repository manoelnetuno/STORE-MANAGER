const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { getAllProductz, getProductzById } = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/productService');
const productsController = require('../../../src/controllers/productsController');
const { updatedProductMock } = require('../mocks/product.mock');
const productMiddleware = require('../../../src/middlewares/validations');

chai.use(sinonChai);

describe('Realizando testes - Product Controller', function () {
  it('GET:retorna todos os produtos', async function () {
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
  it('GET:retornas um produto pelo id', async function () {
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
  it('GET:deve retornar erro quando não achar o produto', async function () {
    const productId = 666;
    sinon.stub(productService, 'productId').resolves(null);
    const req = { params: { id: productId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getProductzById(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('POST:deve retornar erro quando o tamanho do nome do produto for invalido', async function () {
    const req = { body: { name: 'edgb' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productMiddleware.validateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  it('POST:deve retornar erro quando o nome não é enviado', async function () {
    const req = { body: {
      name: '',
    } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productMiddleware.validateProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('POST:deve criar um novo produto', async function () {
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
  it('PUT:deve atualizar o produto com sucesso', async function () {
    const newProductName = 'joystick do flash';
    const updatedProduct = { id: 3, name: newProductName };
    const req = { params: { id: 3 }, body: { name: updatedProduct } };
    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productService, 'productId').resolves({ updatedProductMock });
    sinon.stub(productService, 'updateProduct').resolves(updatedProduct);

    await productsController.putUpdateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });
  it('PUT:deve retornar erro ao não encontrar o produto a ser atualizado', async function () {
    const req = { params: { id: 666 }, body: { name: 'Joystick do Flash' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productService, 'productId').resolves(null);
    await productsController.putUpdateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('PUT:deve retornar erro quando não encontrar o name do produto atualizado', async function () {
    const req = { params: { id: 3 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productMiddleware.validateProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('PUT:deve retornar erro quando o name atualizado não possuir tamanho permitido', async function () {
    const req = { params: { id: 3 }, body: { name: 'edgb' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productMiddleware.validateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  it('DELETE: deve retornar erro caso o produto não exista', async function () {
    const productId = 666;
    const req = { params: { id: productId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productService, 'productId').resolves(null);

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('DELETE:deve deletar o produto', async function () {
    const productId = 3;
    const req = { params: { id: productId } };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    sinon.stub(productService, 'productId').resolves({ id: productId, name: 'Product Name' });
    sinon.stub(productService, 'deleteProduct').resolves();

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  afterEach(function () {
    sinon.restore();
  });
});