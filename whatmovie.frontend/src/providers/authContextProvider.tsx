import React, { useEffect, useState, ReactNode, Provider, useReducer, ReducerAction } from "react";
import { AuthState, AuthContext, AuthProps } from "../context/authContext";
import * as AuthService from "../services/authService";
import { navigate } from "gatsby";
import { hasValue } from "../utils";
import { CognitoUser } from 'amazon-cognito-identity-js';

export type Props = {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {

    const [state, setState] = useState<AuthProps>({
      user: undefined,
      isLoggedin: false,
      isInitializing: true,
      isLoginLoading: false,
      isLogoutLoading: false,
      error: ''
    });
    
    const getAuthenticatedUser = async () => {
      const response = await AuthService.getCurrentUser();
      let user: CognitoUser | undefined;

      if(typeof response.data !== 'undefined' && typeof response.data !== 'string') {
        user = response.data;
      }

      setState({
        user,
        isLoggedin: response.success,
        isInitializing: false,
        isLoginLoading: false,
        isLogoutLoading: false,
        error: ''
      });
    }

    const signIn = async (username: string, password: string) => {
        setState({
            ...state,
            isLoginLoading: true,
            error: ''
        });
        const response = await AuthService.signIn(username, password);
        if(response.success) {      
            setState({
                ...state,
                user: response.data,
                isLoggedin: true,
                isLoginLoading: false
            });
            navigate('/movies');
        } else {
            setState({
                ...state,
                user: undefined,
                isLoggedin: false,
                isLoginLoading: false,
                error: response.message || 'Error'
            })
        }       
    }; 

    const signOut = async () => {
        const response = await AuthService.signOut();
        if(response.success) {
            setState({
                ...state,
                user: undefined,
                isLoggedin: false,
                isLogoutLoading: false
            })
            navigate('/');
        }
    }

    useEffect(() => {
        getAuthenticatedUser();
    },[]);

    const authState: AuthState = { ...state, signIn, signOut };

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}