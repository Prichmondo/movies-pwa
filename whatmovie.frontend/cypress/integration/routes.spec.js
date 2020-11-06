import { user } from '../mocks/user';
import loginPage from '../elements/loginPage';
import browsePage from '../elements/browse';

describe('Routes', () => {

  beforeEach(() => {
    cy.visit(loginPage.url);
  });

  it('Visiting private route redirects anonymous users to the login page', () => {
    cy.visit(browsePage.url);
    cy.location('pathname').should('eq', loginPage.pathname);
  });

  it('Visiting anonymous only route redirects authenticated users to the browse page', () => {
    
    cy.visit(loginPage.url);
    const { email, password } = user;
    cy.get(loginPage.emailInput).type(email);
    cy.get(loginPage.passwordInput).type(password);
    cy.get(loginPage.submitButton).click();
    cy.location('pathname').should('eq', browsePage.pathname);
    
    cy.visit(loginPage.url);
    cy.location('pathname').should('eq', browsePage.pathname);
  });

})