import { Auth } from 'aws-amplify';

export const BASEURL = 'https://0tgmiwlvv8.execute-api.eu-west-1.amazonaws.com/Prod/';

async function call<T>(url: string, options: RequestInit): Promise<T> {

  const credentials = await Auth.currentCredentials();

  options = {
    ...options,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': credentials.sessionToken
    }
  }
  
  const respone = await fetch(url, options);

  return respone.json();
}

export async function get<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await call<T>(url, {...options, method: 'GET'});
  return response;
}