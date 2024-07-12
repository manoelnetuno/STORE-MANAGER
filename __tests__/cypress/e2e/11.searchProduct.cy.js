/// <reference types="cypress" />
import products from '../fixtures/allProducts.json';
import product from '../fixtures/oneProduct.json';
import { getRequirementDescription } from '../utils/requirements';

const requirementDescription = getRequirementDescription(11);
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

  it('Será validado que é possível buscar um produto pelo name', () => {
    cy.request('GET', `${BACK_URL}/products/search?q=Martelo`).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([product]);
    });
  });

  it('Será validado que é possível buscar todos os produtos quando passa a busca vazia', () => {
    cy.request('GET', `${BACK_URL}/products/search?q=`).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(products);
    });
  });

  it('Será validado que a busca retorna um array vazio quando não há produtos correspondentes', () => {
    cy.request('GET', `${BACK_URL}/products/search?q=ProdutoInexistente`).should((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([]);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 70% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(70);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 33 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(33);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 70% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(70);
    });
  });
});
