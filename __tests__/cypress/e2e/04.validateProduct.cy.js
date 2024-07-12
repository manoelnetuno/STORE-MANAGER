/// <reference types="cypress" />
import { wrongProductBody, wrongSizeProductBody } from '../fixtures/wrongProducts.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(4);
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

  it('Será validado que não é possível realizar operações em um produto sem o campo name', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/products`, body: wrongProductBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"name" is required' });
      });
  });

  it('Será validado que não é possível realizar operações em um produto com o campo name menor que 5 caracteres', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/products`, body: wrongSizeProductBody, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
      });
  });

  it('Será validado que os testes estão cobrindo pelo menos 40% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(40);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 15 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(15);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 40% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(40);
    });
  });
});
