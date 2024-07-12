/// <reference types="cypress" />
import { getRequirementDescription } from '../utils/requirements';
import products from '../fixtures/allProducts.json';
import product from '../fixtures/oneProduct.json';

const requirementDescription = getRequirementDescription(1);
const BACK_URL = Cypress.env('BACKEND') || 'http://localhost:3001';

describe(requirementDescription, () => {
  before(() => {
    cy.task('runMochaTests', { force: true });
  });

  beforeEach(() => {
    cy.task('reloadDb');
    cy.task('readCoverageData').as('coverageReport');
    cy.task('readMutationData').as('mutationReport');
  });

  it('Será validado o acesso ao endpoint através do caminho /products', () => {
    cy.request('GET', `${BACK_URL}/products`).should((response) => {
      expect(response.status).to.be.equal(200);
    });
  });

  it('Será validado que é possível listar todos os produtos', () => {
    cy.request('GET', `${BACK_URL}/products`).should((response) => {
      expect(response.body).to.be.deep.equal(products);
    });
  });

  it('Será validado que não é possível listar um produto que não existe', () => {
    cy.request({
      method: 'GET',
      url: `${BACK_URL}/products/999`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  it('Será validado que é possível listar um produto específico com sucesso', () => {
    cy.request('GET', `${BACK_URL}/products/1`).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(product);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(30);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 6 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(6);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(30);
    });
  });
});
