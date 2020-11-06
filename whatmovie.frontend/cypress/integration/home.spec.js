import homePage from '../elements/homePage';
import registerPage from '../elements/registerPage';

describe('Home Page', () => {

  beforeEach(() => {
    cy.visit(homePage.url);
  })

  it('Displays the home page', () => {
    cy.get(homePage.title).should('exist');
    cy.get(homePage.subtitle).should('exist');
    cy.get(homePage.description).should('exist');
    cy.get(homePage.emailInput).should('exist');
    cy.get(homePage.getStartedButton).should('exist');
  });

  it('Starts the register flow setting the email', () => {

    const fakeEmail = 'fake@email.com';
    
    cy.get(homePage.emailInput).as('email');
    cy.get(homePage.getStartedButton).as('submit');

    cy.get('@email')
      .type(fakeEmail)
      .should('have.value', fakeEmail);

    cy.get('@submit')
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq(registerPage.pathname);
    });

    cy.get(registerPage.presetEmail)
      .should('contain', fakeEmail)
  });

})