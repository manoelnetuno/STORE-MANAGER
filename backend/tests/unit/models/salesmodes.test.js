const sinon = require('sinon');
const { expect } = require('chai');
const { getAllSales, getSalesId, postCreateSale } = require('../../../src/models/salesmodes');
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
  it('POST: deve criar uma nova venda', async function () {
    const fakeId = 666;
    sinon.stub(dB, 'execute').resolves([{ insertId: fakeId }]);
    const result = await postCreateSale();
    expect(result).to.equal(fakeId);
  });
  // it('POST: deve criar um novo produto de venda', async function (){
  //   const saleId = 666;
  //   const productId = 555;
  //   const quantity = 4;
  //   const stub = sinon.stub();
  //   sinon.stub(dB, 'execute').callsFake(stub);
  //   await postCreateSaleProduct(saleId, productId, quantity);

  //   expect(stub).to.have.been.calledOnceWithExactly(
  //     'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
  //     [saleId, productId, quantity],
  //   );
  // });
  afterEach(function () {
    sinon.restore();
  });
});