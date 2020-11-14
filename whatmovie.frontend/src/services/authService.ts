import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { IResponse, getSuccessResponse, getErrorResponse } from '../domain/IResponse';

export async function signUp(email: string, password: string): Promise<IResponse<CognitoUser>> {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        });
        return getSuccessResponse(user);
    } catch (error) {
        return getErrorResponse(error.code, error.message);
    }
}

export async function confirmSignUp(username: string, code: string): Promise<IResponse<CognitoUser>> {
  try {
      const response = await Auth.confirmSignUp(username, code)
      return getSuccessResponse(response);
  } catch (error) {
      return getErrorResponse(error.code, error.message);
  }
}


export async function signIn(username: string, password: string): Promise<IResponse<CognitoUser>> {
    try {
        const response = await Auth.signIn({
            username,
            password
        }) as CognitoUser;
        return getSuccessResponse(response);
    } catch (error) {
        return getErrorResponse(error.code, error.message);
    }
}

export async function forgotPassword(username: string): Promise<IResponse<any>> {
    try {
        const response = await Auth.forgotPassword(username);
        return getSuccessResponse(response);
    } catch (error) {
        return getErrorResponse(error.code, error.message);
    }
}

export async function forgotPasswordSubmit(username: string, password: string, code: string): Promise<IResponse<void>> {
    try {
        const response = await Auth.forgotPasswordSubmit(username, code, password);
        return getSuccessResponse(response);
    } catch (error) {
        return getErrorResponse(error.code, error.message);
    }
}

export function hasAuthData(): boolean {
  if(window && window.localStorage) {
    for(let i = 0, key; i<window.localStorage.length; i++) {
      key = window.localStorage.key(i);
      if(key && key.indexOf('CognitoIdentityServiceProvider') > -1) {
        return true;
      }
    }    
  }
  return false;
}

export async function getCurrentUser(): Promise<IResponse<CognitoUser | string>> {
  try {
    if(!hasAuthData()) {
      return getErrorResponse('not authenticated');
    }
    const response = await Auth.currentAuthenticatedUser();
    return getSuccessResponse(response);
  } catch (error) {
    console.log('GET USER', typeof error)
    return getErrorResponse(error.code, error.message);
  }
}

export async function signOut(): Promise<IResponse<any>> {
    try {
        const response = await Auth.signOut();
        return getSuccessResponse(response);
    } catch (error) {
        return getErrorResponse(error.code, error.message);
    }
}