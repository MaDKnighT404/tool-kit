/// <reference types="cypress" />

describe('App is normally rendered', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Header, main and footer are rendered', () => {
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('Greeting authorized user rendered', () => {
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('[data-cy="resultTitle"]').contains('Hello ');
    cy.get('[data-cy="resultMessage"]').contains('This is your repositories:');
  });

  it('Pagination rendered', () => {
    cy.get('[class*="pagination"]').should('be.visible');
    cy.get('[class*="pagination__item"]').should('be.visible');
  });
});

describe('Pagination work correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Change active class after click on pagination list item', () => {
    cy.get('[class*="pagination__item"]')
      .eq(0)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]').eq(1).click();
    cy.get('[class*="pagination__item"]')
      .eq(0)
      .should('not.contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]')
      .eq(1)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
  });
});
