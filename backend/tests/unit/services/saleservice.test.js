const chai = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const salesModel = require('../../../src/models/salesmodes');
const salesService = require('../../../src/services/salesService');
const { salesMock, salesIdMock } = require('../mocks/sales.mock');

chai.use(sinonchai);
const { expect } = chai;

describe('realizando testes da camada services dos sales', function () {
  it('GET: getAllSales', async function () {
    const salesData = salesMock;
    sinon.stub(salesModel, 'getAllSales').resolves(salesData);
    const sales = await salesService.getAllSales();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(2);
  });
  it('GET:getSalesId', async function () {
    const salesID = 2;
    const salesData = salesIdMock;
    sinon.stub(salesModel, 'getSalesId').resolves(salesData);
    const result = await salesService.getSalesId(salesID);
    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.be.an('array');
    expect(result.data).to.deep.equal(salesData);
  });
  it('ERROR: deve retornar NOT_FOUND se a venda não for encontrada', async function () {
    const salesID = 666;
    sinon.stub(salesModel, 'getSalesId').resolves([]);
    const result = await salesService.getSalesId(salesID);
    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal('Sale not found');
  });
  afterEach(function () {
    sinon.restore();
  });
});