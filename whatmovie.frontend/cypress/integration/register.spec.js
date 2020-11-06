import { user } from '../mocks/user';
import registerPage from '../elements/registerPage';

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit(registerPage.url);
  })

  it('Visit login page', () => {
    cy.get(registerPage.emailInput).should('exist');
    cy.get(registerPage.passwordInput).should('exist');
    cy.get(registerPage.registerButton).should('exist');
    cy.get(registerPage.loginLink).should('exist');
  });

  // it('Login flow - happy path', () => {

  //   const { email, password } = user;

  //   cy.get(loginPage.emailInput)
  //     .type(email)
  //     .should('have.value', email);

  //   cy.get(loginPage.passwordInput)
  //     .type(password)
  //     .should('have.value', password);

  //   cy.get(loginPage.submitButton)
  //     .click();

  //   cy.location('pathname').should('eq', '/browse');

  // });

})