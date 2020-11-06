import testid from '../utils/testid';
import url from '../utils/url';

const PATH_NAME = '/login';

export default {
  pathname: PATH_NAME,
  url: url(PATH_NAME),
  emailInput: testid('email-input'), 
  passwordInput: testid('password-input'), 
  forgotPassword: testid('forgot-password'),
  forgotPasswordLink: testid('forgot-password-link'),
  submitButton: testid('submit-button'), 
  registerLink: testid('register-link'),
  errorText: testid('error-text') 
}