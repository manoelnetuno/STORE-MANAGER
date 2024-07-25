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
    const salesData = { status: 200, data: salesIdMock };
        
    sinon.stub(salesService, 'getSalesId').resolves(salesData);

    await salesController.getSalesId(req, res);

    expect(res.status).to.have.been.calledWith(salesData.status);
    expect(res.json).to.have.been.calledWith(salesData.data);
  });
  it('GET:deve retornar error se não encontrar a sale pelo id', async function () {
    const req = { params: { id: 666 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const salesData = { status: 404, data: { message: 'Sale not found' } };
        
    sinon.stub(salesService, 'getSalesId').resolves(salesData);

    await salesController.getSalesId(req, res);
    expect(res.status).to.have.been.calledWith(salesData.status);
    expect(res.json).to.have.been.calledWith(salesData.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});