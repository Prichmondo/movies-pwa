import '../amplify.config';
import { Auth } from 'aws-amplify';

export const BASEURL = 'https://0tgmiwlvv8.execute-api.eu-west-1.amazonaws.com/Prod/';

async function call<T>(url: string, options: RequestInit): Promise<T> {

  const user = await Auth.currentAuthenticatedUser();

  options = {
    ...options,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': user.signInUserSession.idToken.jwtToken
    }
  }
  
  const respone = await fetch(url, options);
  const data = await respone.json();
  return data;
}

export async function get<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await call<T>(url, {...options, method: 'GET'});
  return response;
}

export async function put<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await call<T>(url, {...options, method: 'PUT'});
  return response;
}

export async function post<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await call<T>(url, {...options, method: 'POST'});
  return response;
}

export async function del<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await call<T>(url, {...options, method: 'DELETE'});
  return response;
}