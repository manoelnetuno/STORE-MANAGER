/// <reference types="cypress" />
import { expectedResponse, request } from '../fixtures/newProduct.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(3);
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

  it('Será validado que é possível cadastrar um produto com sucesso', () => {
    cy.request(
      'POST',
      `${BACK_URL}/products`,
      request,
    ).should((response) => {
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(expectedResponse);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(30);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 15 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(15);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(30);
    });
  });
});
