import { user } from '../mocks/user';
import loginPage from '../elements/loginPage';
import browsePage from '../elements/browsePage';
import auth from '../utils/auth';

describe('Routes', () => {

  beforeEach(() => {
    cy.visit(loginPage.url);
  });

  it('Visiting private route redirects anonymous users to the login page', () => {
    cy.visit(browsePage.url);
    cy.location('pathname').should('eq', loginPage.pathname);
  });

  it('Visiting anonymous only route redirects authenticated users to the browse page', () => {
    const { email, password } = user;
    auth.performLogin(email, password);    
    cy.visit(loginPage.url);
    cy.location('pathname').should('eq', browsePage.pathname);
  });

})