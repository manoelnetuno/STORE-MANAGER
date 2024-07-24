const chai = require('chai');
const sinon = require('sinon');
const productsModes = require('../../../src/models/productsModes');
const connection = require('../../../src/models/connections');

const { expect } = chai;

describe('deve criar um produto', function () {
  it('deve criar um produto', async function () {
    const validname = 'joystick';
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModes.postCreateProduct(validname);

    expect(result).to.be.deep.equal({
      id: 4,
      name: validname,
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});