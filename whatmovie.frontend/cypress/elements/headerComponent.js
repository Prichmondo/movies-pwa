import testid from '../utils/testid';

export default {
  desktop: {
    logo: testid('header-logo-link'),
    accountMenu: testid('header-account-menu'),
    searchInput: testid('header-search-input-desktop'),
    homeLink: testid('header-browse-desktop-link'),
    ratedLink: testid('header-rated-desktop-link'),
    mylistLink: testid('header-mylist-desktop-link'),
    logout: testid('header-logout-desktop'),
    username: testid('header-username-desktop')
  },
  mobile: {
    logo: testid('header-logo-link'),
    searchInput: testid('header-search-input-mobile'),
    homeLink: testid('header-browse-mobile-link'),
    ratedLink: testid('header-rated-mobile-link'),
    mylistLink: testid('header-mylist-mobile-link'),
    logout: testid('header-logout-mobile'),
    username: testid('header-username-mobile')
  }
  
}