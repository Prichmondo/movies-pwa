import { user } from '../mocks/user';
import registerPage from '../elements/registerPage';
import emailClient from '../utils/emailClient';
import routes from '../utils/routes';

describe('Register Page', () => {

  beforeEach(() => {
    cy.visit(registerPage.url);
  })

  it('Visit Register page', async () => {
    cy.get(registerPage.emailInput).should('exist');
    cy.get(registerPage.passwordInput).should('exist');
    cy.get(registerPage.registerButton).should('exist');
    cy.get(registerPage.loginLink).should('exist');
  });

  it('Register flow - happy path', async () => {

    const inbox = await emailClient.createInbox();
    const password = 'Password1';

    cy.get(registerPage.emailInput)
      .type(inbox.emailAddress)
      .should('have.value', inbox.emailAddress);

    cy.get(registerPage.passwordInput)
      .type(password)
      .should('have.value', password);

    cy.get(registerPage.checkEmailMessageTitle).should('exist');

    // cy.get(registerPage.registerButton)
    //   .click();

    // cy.get(registerPage.checkEmailMessageTitle).should('exist');
    // cy.get(registerPage.checkEmailMessageDescription).should('exist');

    // const latestEmail = await emailClient.waitForLatestEmail(inbox.id);
    
    // expect(latestEmail.body).contain(routes.cognitoConfirmUser);

    // var activationUrlStart = latestEmail.body.lastIndexOf(routes.cognitoConfirmUser);
    // var activationUrlEnd = latestEmail.body.lastIndexOf('>Verify Email');
    // var activationUrl = latestEmail.body.substring(activationUrlStart, activationUrlEnd);

    // cy.visit(activationUrl);

    // cy.get(loginPage.emailInput)
    //   .type(email)
    //   .should('have.value', email);

    // cy.get(loginPage.passwordInput)
    //   .type(password)
    //   .should('have.value', password);

    // cy.get(loginPage.submitButton)
    //   .click();

    // cy.location('pathname').should('eq', browsePage.pathname);

  });

})