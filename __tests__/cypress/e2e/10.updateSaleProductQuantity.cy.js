/// <reference types="cypress" />
import { expectedInDB, expectedResponse, request, wrongRequestMissingQuantity, wrongRequestInvalidQuantity } from '../fixtures/updateSale.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(10);
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
  it('Será validado que não é possível realizar alterações em uma venda sem o campo quantity', () => {
    cy.request({ method: 'PUT', url: `${BACK_URL}/sales/1/products/2/quantity`, body: wrongRequestMissingQuantity, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
      });
  });

  it('Será validado que não é possível realizar alterações em uma venda com o campo quantity menor ou igual a 0 (Zero), quantidade 0', () => {
    cy.request({ method: 'PUT', url: `${BACK_URL}/sales/1/products/2/quantity`, body: wrongRequestInvalidQuantity, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
      });
  });

  it('Será validado que não é possível realizar alterações em uma venda com productId inexistente', () => {
    cy.request({ method: 'PUT', url: `${BACK_URL}/sales/1/products/999/quantity`, body: request, failOnStatusCode: false })
      .should((response) => {
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.deep.equal({ message: 'Product not found in sale' });
      });
  });

  it('Será validado que não é possível alterar uma venda que não existe', () => {
    cy.request({
      method: 'PUT',
      url: `${BACK_URL}/sales/999/products/2/quantity`,
      body: request,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  it('Será validado que é possível alterar a quantidade de um produto de uma venda com sucesso', () => {
    cy.request('PUT', `${BACK_URL}/sales/1/products/2/quantity`, request).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.all.keys(['saleId', 'productId', 'quantity', 'date']);
      expect(response.body.saleId).to.be.equal(1);
      expect(response.body.productId).to.be.equal(2);
      expect(response.body.quantity).to.be.equal(20);
      expect(new Date(response.body.date)).to.not.be.equal('Invalid Date');
    });
  });

  it('Será validado que a quantidade do produto foi alterada no banco de dados', () => {
    cy.request('PUT', `${BACK_URL}/sales/1/products/2/quantity`, request);
    cy.task('getSaleProductsBySaleId', expectedResponse.saleId).should((products) => {
      expect(products).to.have.deep.members(expectedInDB);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 70% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(70);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(30);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 70% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(70);
    });
  });
});
