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
    cy.get('[class*="result__title"]').contains('Hello ');
    cy.get('[class*="result__message"]').contains('This is your repositories:');
  });

  it('User repositories rendered', () => {
    cy.get('[class*="result__list"]').should('have.length.greaterThan', 0);
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

  it('Change active class after click on pagination page', () => {
    cy.get('[class*="pagination__item"]')
      .eq(0)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]').eq(1).click();
    cy.get('[class*="pagination__item"]').eq(0).should('not.contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]')
      .eq(1)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
  });

  it('Pagination page save after refresh page', () => {
    cy.get('[class*="pagination__item"]')
      .eq(0)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]').eq(1).click();
    cy.get('[class*="pagination__item"]').eq(0).should('not.contain', 'pagination__item_active');
    cy.get('[class*="pagination__item"]')
      .eq(1)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
    cy.reload();
    cy.get('[class*="pagination__item"]')
      .eq(1)
      .invoke('attr', 'class')
      .should('contain', 'pagination__item_active');
  });

  it('Change results list after click pagination page', () => {
    cy.get('[class*="result__text"]').eq(0).contains('Pomodoro_Timer');
    cy.get('[class*="pagination__item"]').eq(1).click();
    cy.get('[class*="result__text"]').eq(0).contains('basic-js');
  });
});

describe('Input search work correctly ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('typing text into input grants correct result', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[type="text"]').type('hello');
    cy.get('input[type="text"]').should('have.value', 'hello');

    cy.intercept('POST', 'https://api.github.com/graphql').as('graphqlRequest');
    cy.wait('@graphqlRequest');
    cy.get('[class*="result__text"]').should(($element) => {
      expect($element).to.contain('hello');
    });
  });

  it('Result item contain all information. Click on repository show Card', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[type="text"]').type('hello');
    cy.get('input[type="text"]').should('have.value', 'hello');

    cy.intercept('POST', 'https://api.github.com/graphql').as('graphqlRequest');
    cy.wait('@graphqlRequest');

    cy.get('[class*="result__text"]').eq(0).contains('Repository');
    cy.get('[class*="result__text"]').eq(1).contains('Stars');
    cy.get('[class*="result__text"]').eq(2).contains('Github');
    cy.get('[class*="result__text"]').eq(3).contains('commit');

    cy.get('[class*="result__text"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:5173/repo_card');

  });
});


describe('Repository card render correctly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('Repository card contain all information', () => {
    cy.get('input[type="text"]').type('hello');
    cy.get('input[type="text"]').should('have.value', 'hello');

    cy.intercept('POST', 'https://api.github.com/graphql').as('graphqlRequest');
    cy.wait('@graphqlRequest');

    cy.get('[class*="result__text"]').eq(0).click();

    cy.get('[class*="card"]').should('be.visible');
    cy.get('[class*="card__stars"]').should('be.visible');
    cy.get('[class*="profile"]').should('be.visible');
    cy.get('[class*="profile__name"]').should('be.visible');
    cy.get('[class*="profile__img"]').should('be.visible');
    cy.get('[class*="description"]').should('be.visible');
    cy.get('[class*="description__commit"]').should('be.visible');
    cy.get('[class*="language"]').should('be.visible');
  });


});
