describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  })

  it('Displays the home page', () => {
    cy.get('[data-testid="title"]').should('exist');
    cy.get('[data-testid="subtitle"]').should('exist');
    cy.get('[data-testid="description"]').should('exist');
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="get-started-button"]').should('exist');
  });

  it('Starts the register flow setting the email', () => {

    const fakeEmail = 'fake@email.com';
    
    cy.get('[data-testid="email-input"]').as('email');
    cy.get('[data-testid="get-started-button"]').as('submit');

    cy.get('@email')
      .type(fakeEmail)
      .should('have.value', fakeEmail);

    cy.get('@submit')
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/register');
    });

    cy.get('[data-testid="preset-email"]')
      .should('contain', fakeEmail)
  });

})