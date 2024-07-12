/// <reference types="cypress" />
import { expectedResponse, request } from '../fixtures/updateProduct.json';
import { wrongProductBody, wrongSizeProductBody } from '../fixtures/wrongProducts.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(7);

const BACK_URL = Cypress.env('BACKEND') || 'http://localhost:3001';

describe(requirementDescription, () => {
  before(() => {
    cy.task('runMochaTests', { spec: Cypress.spec.name });
  });

  beforeEach(() => {
    cy.task('reloadDb');
    cy.task('readCoverageData').as('coverageReport');
    cy.task('readMutationData').as('mutationReport');
  });

  it('Será validado que não é possível alterar um produto sem o campo name', () => {
    cy.request({ method: 'PUT', url: `${BACK_URL}/products/1`, body: wrongProductBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"name" is required' });
      });
  });

  it('Será validado que não é possível alterar um produto com o campo name menor que 5 caracteres', () => {
    cy.request({ method: 'PUT', url: `${BACK_URL}/products/1`, body: wrongSizeProductBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
      });
  });

  it('Será validado que não é possível alterar um produto que não existe', () => {
    cy.request({
      method: 'PUT',
      url: `${BACK_URL}/products/999`,
      body: request,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  it('Será validado que é possível alterar um produto com sucesso', () => {
    cy.request(
      'PUT',
      `${BACK_URL}/products/1`,
      request,
    ).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(expectedResponse);
    });
  });

  it('Será validado que o produto foi alterado no banco de dados', () => {
    cy.request('PUT', `${BACK_URL}/products/1`, request);
    cy.task('getProductById', 1).should((product) => {
      expect(product).to.be.deep.equal({ id: 1, name: 'Machado do Thor Stormbreaker' });
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 50% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(50);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 21 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(21);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 50% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(50);
    });
  });
});
