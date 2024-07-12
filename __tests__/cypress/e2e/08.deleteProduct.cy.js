/// <reference types="cypress" />
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(8);
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

  it('Será validado que não é possível deletar um produto que não existe', () => {
    cy.request({
      method: 'DELETE',
      url: `${BACK_URL}/products/999`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  it('Será validado que é possível deletar um produto com sucesso', () => {
    cy.request('DELETE', `${BACK_URL}/products/1`).should((response) => {
      expect(response.status).to.be.equal(204);
    });
  });

  it('Será validado que o produto foi removido do banco de dados', () => {
    cy.request('DELETE', `${BACK_URL}/products/1`);
    cy.task('getProductById', 1).should((product) => {
      expect(product).to.be.equal(null);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 60% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(60);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 24 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(24);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 60% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(60);
    });
  });
});
