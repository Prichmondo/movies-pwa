import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_k4gGWwz9y',
    userPoolWebClientId: 'f2rt1ebdhh5vi9oe61n3a4d3g',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: {
        domain: 'https://pwa-movies.auth.eu-west-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:8000/',
        redirectSignOut: 'http://localhost:8000/',
        responseType: 'code'
    }
  }
});