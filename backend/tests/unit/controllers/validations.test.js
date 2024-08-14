const { expect } = require('chai');
const sinon = require('sinon');
const salemiddleware = require('../../../src/middlewares/validationsSales');
const salemodel = require('../../../src/models/salesmodes');

describe('realizando testes na validação das sales', function () {
  it('deve retornar erro 400 se não houver itens de venda', async function () {
    const req = { body: [] };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub();

    await salemiddleware.validateSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: 'No sale items provided' });
  });

  it('deve retornar erro 400 se algum item de venda não tiver productId', async function () {
    const req = { body: [{ productId:1, quantity: 1 }, { quantity: 1}, { productId:-1, quantity: 2}] };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub();

    await salemiddleware.validateSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('deve retornar erro 400 se algum item de venda não tiver quantity', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub();

    await salemiddleware.validateSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('deve retornar erro 422 se algum item de venda tiver quantity <= 0', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub();

    await salemiddleware.validateQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.status().json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('deve retornar 404 quando o product id não existir', async function () {
    req = {
      body: [{ productId: 1000, quantity:5}],
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
    await salemiddleware.validateProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: 'Product not found'
    });
  });

  it('deve seguir ao proximo middleware depois do next', async function (){
    sinon.stub(salemodel, 'getSalesId').resolves(true);
    req = {
      body: [{ productId: 1, quantity:5}],
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
    await salemiddleware.validateProduct(req, res, next);
    });
  });

  afterEach(function () {
    sinon.restore();
  });