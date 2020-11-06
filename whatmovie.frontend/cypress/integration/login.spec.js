import { user } from '../mocks/user';

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:9000/login');
  })

  it('Visit login page', () => {
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="forgot-password-link"]').should('exist');
    cy.get('[data-testid="submit-button"]').should('exist');
    cy.get('[data-testid="register-link"]').should('exist');
  });

  it('Login flow - happy path', () => {

    const { email, password } = user;

    cy.get('[data-testid="email-input"]')
      .type(email)
      .should('have.value', email);

    cy.get('[data-testid="password-input"]')
      .type(password)
      .should('have.value', password);

    cy.get('[data-testid="submit-button"]')
      .click();

    cy.location('pathname').should('eq', '/browse');

  });

  it('Login flow - entering incorrect format credentials', () => {

    const email = 'wrong-email';
    const password = 'wrong-password';

    cy.get('[data-testid="email-input"]')
      .type(email)
      .should('have.value', email);

    cy.get('[data-testid="password-input"]')
      .type(password)
      .should('have.value', password);

    cy.get('[data-testid="submit-button"]')
      .click();

    cy.get('[data-testid="error-text"]').should('contain', 'Error: Incorrect username or password.');

  });

})