/// <reference types="cypress" />
import { expectedResponse, request } from '../fixtures/newSale.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(5);
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

  it('Será validado que é possível cadastrar uma venda com sucesso', () => {
    cy.request({ method: 'POST', url: `${BACK_URL}/sales`, body: request })
      .then((response) => {
        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(expectedResponse);
        cy.task('getSaleProductsBySaleId', expectedResponse.id).then((products) => {
          expect(products).to.have.deep.members([
            { sale_id: expectedResponse.id, product_id: request[0].productId, quantity: request[0].quantity },
            { sale_id: expectedResponse.id, product_id: request[1].productId, quantity: request[1].quantity },
          ]);
        });
      });
  });

  it('Será validado que os testes estão cobrindo pelo menos 40% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(40);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 18 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(18);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 40% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(40);
    });
  });
});
