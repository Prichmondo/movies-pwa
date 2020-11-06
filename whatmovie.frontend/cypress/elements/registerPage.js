import testid from '../utils/testid';
import url from '../utils/url';

const PATH_NAME = '/register';

export default {
  pathname: PATH_NAME,
  url: url(PATH_NAME),
  emailInput: testid('email-input'), 
  passwordInput: testid('password-input'),
  registerButton: testid('register-button'), 
  loginLink: testid('signin-link'),
  presetEmail: testid('preset-email'),
  checkEmailMessageTitle: testid('check-email-message-title'),
  checkEmailMessageDescription: testid('check-email-message-description')  
}