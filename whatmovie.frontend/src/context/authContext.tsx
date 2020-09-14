import { createContext } from "react";
import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthProps = {
  user: CognitoUser | undefined;
  isLoggedin: boolean;
  isInitializing: boolean;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
  error: string;
}

export type AuthAction = {
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

export type AuthState = AuthProps & AuthAction;

const defaultAuthState: AuthState = {
    user: undefined,
    isLoggedin: false,
    isInitializing: true,
    isLoginLoading: false,
    isLogoutLoading: false,
    error: '',
    signIn: () => {},
    signOut: () => {}
}

export const AuthContext = createContext<AuthState>(defaultAuthState);