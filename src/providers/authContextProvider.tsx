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
        isLogoutLoading: false
    });
    
    const getAuthenticatedUser = async () => {
        const response = await AuthService.getCurrentUser();
        const isAuthenticated = response != "not authenticated";
        setState({
            isLoggedin: isAuthenticated,
            isInitializing: false,
            isLoginLoading: false,
            isLogoutLoading: false
        });
    }

    const signIn = async (username: string, password: string) => {
        const response = await AuthService.signIn(username, password) as any;
        console.log('SignIn response', response);
        if(response.username) {      
            setState({
                ...state,
                isLoggedin: true,
                isLoginLoading: false
            })
            navigate('/movies');
        } else {
            setState({
                ...state,
                isLoggedin: false,
                isLoginLoading: false
            })
        }       
    }

    const signOut = async () => {
        await AuthService.signOut();
        setState({
            ...state,
            isLoggedin: false,
            isLogoutLoading: false
        })
        navigate('/');     
    }

    useEffect(() => {
        console.log('AuthContextProvider mount')
        getAuthenticatedUser();
    },[]);

    const authState: AuthState = { ...state, signIn, signOut };

    console.log('isLoggedin', state.isLoggedin);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}