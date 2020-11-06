import loginPage from '../elements/loginPage';
import browsePage from '../elements/browsePage';

exports.performLogin =  function (email, password) {
  cy.visit(loginPage.url);
  cy.get(loginPage.emailInput).type(email);
  cy.get(loginPage.passwordInput).type(password);
  cy.get(loginPage.submitButton).click();
  cy.location('pathname').should('eq', browsePage.pathname);
}