/// <reference types="cypress" />
import { getRequirementDescription } from '../utils/requirements';
import { messages } from '../utils/index.json';

const requirementDescription = getRequirementDescription(2);
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

  describe('Será validado que é possível listar todas as vendas', () => {
    beforeEach(() => {
      cy.request('GET', `${BACK_URL}/sales`).as('request');
    });

    it('deve retornar status 200', () => {
      cy.get('@request').should((response) => {
        expect(response.status).to.be.equal(200);
      });
    });

    it('deve retornar uma array com 3 elementos', () => {
      cy.get('@request').should((response) => {
        expect(response.body.length).to.be.equal(3);
      });
    });

    it('Os elementos devem possuir as chaves esperadas', () => {
      cy.get('@request').should((response) => {
        expect(response.body[0]).to.have.all.keys(['saleId', 'productId', 'quantity', 'date']);
        expect(response.body[1]).to.have.all.keys(['saleId', 'productId', 'quantity', 'date']);
        expect(response.body[2]).to.have.all.keys(['saleId', 'productId', 'quantity', 'date']);
      });
    });

    it('Os elementos devem possuir os valores esperados', () => {
      cy.get('@request').should((response) => {
        expect(response.body[0].saleId).to.be.equal(1);
        expect(response.body[0].productId).to.be.equal(1);
        expect(response.body[0].quantity).to.be.equal(5);
        expect(new Date(response.body[0].date)).to.not.be.equal(messages.INVALID_DATE);
        expect(response.body[1]).to.have.all.keys(['saleId', 'productId', 'quantity', 'date']);
        expect(response.body[1].saleId).to.be.equal(1);
        expect(response.body[1].productId).to.be.equal(2);
        expect(response.body[1].quantity).to.be.equal(10);
        expect(new Date(response.body[1].date)).to.not.be.equal(messages.INVALID_DATE);
        expect(response.body[2].saleId).to.be.equal(2);
        expect(response.body[2].productId).to.be.equal(3);
        expect(response.body[2].quantity).to.be.equal(15);
        expect(new Date(response.body[2].date)).to.not.be.equal(messages.INVALID_DATE);
      });
    });
  });

  it('Será validado que não é possível listar uma venda que não existe', () => {
    cy.request({
      method: 'GET',
      url: `${BACK_URL}/sales/999`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('Será validado que é possível listar uma venda específica com sucesso', () => {
    beforeEach(() => {
      cy.request('GET', `${BACK_URL}/sales/1`).as('request');
    });
    it('deve retornar status 200', () => {
      cy.get('@request').should((response) => {
        expect(response.status).to.be.equal(200);
      });
    });

    it('deve retornar uma array com 2 elementos', () => {
      cy.get('@request').should((response) => {
        expect(response.body.length).to.be.equal(2);
      });
    });

    it('Os elementos devem possuir as chaves esperadas', () => {
      cy.get('@request').should((response) => {
        expect(response.body[0]).to.have.all.keys(['productId', 'quantity', 'date']);
        expect(response.body[1]).to.have.all.keys(['productId', 'quantity', 'date']);
      });
    });

    it('Os elementos devem possuir os valores esperados', () => {
      cy.get('@request').should((response) => {
        expect(response.body[0].productId).to.be.equal(1);
        expect(response.body[0].quantity).to.be.equal(5);
        expect(new Date(response.body[0].date)).to.not.be.equal(messages.INVALID_DATE);
        expect(response.body[1].productId).to.be.equal(2);
        expect(response.body[1].quantity).to.be.equal(10);
        expect(new Date(response.body[1].date)).to.not.be.equal(messages.INVALID_DATE);
      });
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das linhas de código', () => {
    cy.get('@coverageReport').should(({ total: { lines } }) => {
      expect(lines.pct).to.be.at.least(30);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 12 funções do código', () => {
    cy.get('@coverageReport').should(({ total: { functions } }) => {
      expect(functions.total).to.be.at.least(12);
    });
  });

  it('Será validado que os testes estão cobrindo pelo menos 30% das possíveis mutações em código', () => {
    cy.get('@mutationReport').should(({ pct }) => {
      expect(pct).to.be.at.least(30);
    });
  });
});
