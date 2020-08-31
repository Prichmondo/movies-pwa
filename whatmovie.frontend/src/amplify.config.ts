import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_k4gGWwz9y',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'f2rt1ebdhh5vi9oe61n3a4d3g',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // // OPTIONAL - Configuration for cookie storage
        // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict",
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH',

        // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'https://pwa-movies.auth.eu-west-1.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:8000/',
            redirectSignOut: 'http://localhost:8000/',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});