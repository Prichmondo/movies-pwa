describe('Home - Anonymous', () => {

  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  })

  it('Visits the home page', () => {
    cy.get('h1');
  })
})