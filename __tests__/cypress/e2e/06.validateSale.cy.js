/// <reference types="cypress" />
import {
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroNegativeBody,
  wrongZeroQuantityBody,
} from '../fixtures/wrongSales.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(6);
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

  it('Será validado que não é possível cadastrar uma venda sem o campo productId', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: wrongSaleNotProductIdBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"productId" is required' });
      });
  });

  it('Será validado que não é possível cadastrar uma venda sem o campo quantity', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: wrongSaleNotQuantityBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
      });
  });

  it('Será validado que não é possível cadastrar uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade 0', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: wrongZeroQuantityBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
      });
  });

  it('Será validado que não é possível cadastrar uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade negativa', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: wrongZeroNegativeBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
      });
  });

  it('Será validado que não é possível cadastrar uma venda com o campo `productId` inexistente, em uma requisição com um único item', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: nonexistentProductIdBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Product not found' });
      });
  });

  it('Será validado que não é possível cadastrar uma venda com o campo `productId` inexistente, em uma requisição com vários items', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: nonexistentProductIdBody2, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Product not found' });
      });
  });

  it('Será validado que os testes estão cobrindo pelo menos 50% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(50);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 18 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(18);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 50% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(50);
    });
  });
});
