import React, { useEffect, useState, ReactNode, Provider, useReducer, ReducerAction } from "react";
import { AuthState, AuthContext, AuthProps } from "../context/authContext";
import * as AuthService from "../services/authService";
import { navigate } from "gatsby";

export type Props = {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {

    const [state, setState] = useState<AuthProps>({
        isLoggedin: false,
        isInitializing: true,
        isLoginLoading: false,
        isLogoutLoading: false,
        error: ''
    });
    
    const getAuthenticatedUser = async () => {
        const response = await AuthService.getCurrentUser();
        setState({
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
                isLoggedin: true,
                isLoginLoading: false
            });
            navigate('/movies');
        } else {
            setState({
                ...state,
                isLoggedin: false,
                isLoginLoading: false,
                error: response.message || 'Error'
            })
        }       
    };

    const confirmSignUp = async (username: string, code: string) => {
      setState({
          ...state,
          isLoginLoading: true,
          error: ''
      });
      const response = await AuthService.confirmSignUp(username, code);
      console.log(response);
      if(response.success) {      
          setState({
              ...state,
              isLoggedin: true,
              isLoginLoading: false
          });
          navigate('/movies');
      } else {
          setState({
              ...state,
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
                isLoggedin: false,
                isLogoutLoading: false
            })
            navigate('/');
        }
    }

    useEffect(() => {
        getAuthenticatedUser();
    },[]);

    const authState: AuthState = { ...state, signIn, signOut, confirmSignUp };

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}