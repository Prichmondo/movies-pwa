import { Auth } from 'aws-amplify';
import '../amplify.config';
import { CognitoUser } from 'amazon-cognito-identity-js';

export async function signUp(email: string, password: string): Promise<CognitoUser> {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        });
        return user;
    } catch (error) {
        return error;
    }
}

export async function signIn(username: string, password: string): Promise<CognitoUser> {
    try {
        const response = await Auth.signIn({
            username,
            password
        }) as CognitoUser;
        return response;
    } catch (error) {
        return error;
    }
}

export async function forgotPassword(username: string): Promise<any> {
    try {
        const response = await Auth.forgotPassword(username);
        return response;
    } catch (error) {
        return error;
    }
}

export async function forgotPasswordSubmit(username: string, password: string, code: string): Promise<void> {
    try {
        const response = await Auth.forgotPasswordSubmit(username, code, password);
        return response;
    } catch (error) {
        return error;
    }
}