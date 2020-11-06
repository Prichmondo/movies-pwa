import testid from '../utils/testid';
import url from '../utils/url';

const PATH_NAME = '/';

export default {
  pathname: PATH_NAME,
  url: url(PATH_NAME),
  title: testid('title'),
  subtitle: testid('subtitle'),
  description: testid('description'),
  emailInput: testid('email-input'),
  getStartedButton: testid('get-started-button')
}