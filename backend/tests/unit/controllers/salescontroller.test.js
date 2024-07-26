const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const { salesMock, salesIdMock } = require('../mocks/sales.mock');

chai.use(sinonchai);

describe('realizandos testes da camada controller do sales', function () {
  it('GET: deve retornar todas as sales', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const salesData = salesMock;
    sinon.stub(salesService, 'getAllSales').resolves(salesData);

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesData);
  });
  it('GET: deve retornar uma sale pelo id', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const salesData = { status: 'SUCCESSFUL', data: salesIdMock };
        
    sinon.stub(salesService, 'getSalesId').resolves(salesData);

    await salesController.getSalesId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesData.data);
  });
  it('GET:deve retornar error se não encontrar a sale pelo id', async function () {
    const req = { params: { id: 666 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const salesData = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
        
    sinon.stub(salesService, 'getSalesId').resolves(salesData);

    await salesController.getSalesId(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesData.data);
  });
  it('Deve cadastrar uma venda com sucesso', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const newSale = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };

    sinon.stub(salesService, 'createSale').resolves(newSale);

    await salesController.postCreateSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSale);
  });
  afterEach(function () {
    sinon.restore();
  });
});