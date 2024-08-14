const chai = require('chai');
const sinon = require('sinon');
const productsModes = require('../../../src/models/productsModes');
const connection = require('../../../src/models/connections');

const { expect } = chai;

describe('Realizando testes - productModel', function () {
  it('POST:deve criar um produto', async function () {
    const validname = 'joystick';
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModes.postCreateProduct(validname);

    expect(result).to.be.deep.equal({
      id: 4,
      name: validname,
    });
  });
  it('PUT: deve atualizar um produto', async function () {
    const validname = {
      id: 4,
      name:'joystick'}
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModes.putUpdateProduct(validname.id, validname.name);

    expect(result).to.be.deep.equal({
      id: 4,
      name: validname.name,
    });
  });
  it('DELETE:deve deletar um produto', async function () {
    const validname = {
      id: 4,
      name:'joystick'}
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModes.deleteProduct(validname);

    expect(result).to.be.deep.equal();
  });
  afterEach(function () {
    sinon.restore();
  });
});