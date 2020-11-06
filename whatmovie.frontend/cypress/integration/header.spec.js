import { user } from '../mocks/user';
import browsePage from '../elements/browsePage';
import headerComponent from '../elements/headerComponent';
import ratedPage from '../elements/ratedPage';
import mylistPage from '../elements/mylistPage';
import moviesPage from '../elements/moviesPage';
import auth from '../utils/auth';

describe('Header', () => {

  beforeEach(() => {
    const {email, password} = user;
    cy.wrap(auth.performLogin(email, password));
  });

  it('Top navigation navigates through pages', () => {

    cy.get(headerComponent.desktop.ratedLink).click();
    cy.location('pathname').should('eq', ratedPage.pathname);

    cy.get(headerComponent.desktop.mylistLink).click();
    cy.location('pathname').should('eq', mylistPage.pathname);

    cy.get(headerComponent.desktop.homeLink).click();
    cy.location('pathname').should('eq', browsePage.pathname);

  });

  it('Log out link logs out the user', () => {

    cy.get(headerComponent.desktop.logout)
      .should('exist')
      .click({ force: true });

    cy.location('pathname').should('eq', '/');
    
  });

  it('Search input performs serach and redirects to the movies page', () => {

    const searchTerm = 'action';

    cy.get(headerComponent.desktop.searchInput)
      .type(searchTerm)
      .should('have.value', searchTerm)

    cy.get(headerComponent.desktop.searchInput)
      .trigger('keydown', { keyCode: 13, which: 13 });

    cy.location('pathname').should('eq', moviesPage.pathname);

    cy.get('[data-testid="movie-1"]').should('exist');
    
  });

})