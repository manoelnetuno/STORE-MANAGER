const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/models/connections');
const productsMOCK = require('../mocks/product.mock');
const productsModel = require('../../../src/models/productsModes');
const productService = require('../../../src/services/productService');

chai.use(chaiHttp);

const { expect } = chai;

describe('Realizando testes - ProductsService', function () {
  it('GET:deve retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMOCK.ordered, []]);
    const result = await chai.request(app).get('/products');
    expect(result).to.have.status(200);
    expect(result.body).to.be.an('array');
    expect(result.body).to.deep.equal(productsMOCK.ordered);
  });

  it('GET:deve retorna o id do produto', async function () {
    const testId = 1;
    sinon.stub(connection, 'execute').resolves([[productsMOCK.ordered[0]], []]);
    const result = await chai.request(app).get(`/products/${testId}`);
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(productsMOCK.ordered[0]);
  });

  it('GET:retorne error 404 se o produto não existir', async function () {
    const testId = 990;
    sinon.stub(connection, 'execute').resolves([[], []]);
    const result = await chai.request(app).get(`/products/${testId}`);
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'Product not found' });
  });

  it('POST:testa se cria um producto novo', async function () {
    const newProduct = { id: 4, name: 'ProdutoX' };
    sinon.stub(productsModel, 'postCreateProduct').resolves(newProduct);
    const result = await productService.createProduct('ProdutoX');
    expect(result).to.deep.equal(newProduct);
  });
  afterEach(function () {
    sinon.restore();
  });
});
