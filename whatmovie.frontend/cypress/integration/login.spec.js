import { user } from '../mocks/user';
import loginPage from '../elements/loginPage';
import browsePage from '../elements/browse';

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit(loginPage.url);
  })

  it('Visit login page', () => {
    cy.get(loginPage.emailInput).should('exist');
    cy.get(loginPage.passwordInput).should('exist');
    cy.get(loginPage.forgotPasswordLink).should('exist');
    cy.get(loginPage.submitButton).should('exist');
    cy.get(loginPage.registerLink).should('exist');
  });

  it('Login flow - happy path', () => {

    const { email, password } = user;

    cy.get(loginPage.emailInput)
      .type(email)
      .should('have.value', email);

    cy.get(loginPage.passwordInput)
      .type(password)
      .should('have.value', password);

    cy.get(loginPage.submitButton)
      .click();

    cy.location('pathname').should('eq', browsePage.pathname);

  });

  it('Login flow - entering incorrect format credentials', () => {

    const email = 'wrong-email';
    const password = 'wrong-password';

    cy.get(loginPage.emailInput)
      .type(email)
      .should('have.value', email);

    cy.get(loginPage.passwordInput)
      .type(password)
      .should('have.value', password);

    cy.get(loginPage.submitButton)
      .click();

    cy.get(loginPage.errorText).should('contain', 'Error: Incorrect username or password.');

  });

})