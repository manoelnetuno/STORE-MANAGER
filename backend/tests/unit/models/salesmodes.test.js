const sinon = require('sinon');
const { expect } = require('chai');
const { getAllSales, getSalesId } = require('../../../src/models/salesmodes');
const dB = require('../../../src/models/connections');
const salesMock = require('../mocks/sales.mock');
const salesIdMock = require('../mocks/sales.mock');

describe('realizando testes da camada model', function () {
  it('GET:deve retornar todas as sales', async function () {
    const salesData = salesMock;
    sinon.stub(dB, 'execute').resolves([salesData]);

    const result = await getAllSales();
    expect(result).to.deep.equal(salesData);
  });
  it('GET: deve retornar a sale pelo id', async function () {
    const salesData = salesIdMock;
    sinon.stub(dB, 'execute').resolves([salesData]);
    const result = await getSalesId(1);
    expect(result).to.deep.equal(salesData);
  });
  afterEach(function () {
    sinon.restore();
  });
});