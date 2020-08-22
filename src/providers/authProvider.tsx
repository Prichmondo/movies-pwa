import React, { useEffect, useState, ReactNode, Provider, useReducer, ReducerAction } from "react";
import { AuthState, AuthContext } from "../context/authContext";
import { getCurrentUser } from "../services/authService";

export type Props = {
    children: ReactNode
}

type State = {
    isLoggedin: boolean;
    isLoading: boolean;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [state, setState] = useState<State>({
        isLoggedin: false,
        isLoading: true
    });
    
    const getAuthenticatedUser = async () => {
        const response = await getCurrentUser();
        const isAuthenticated = response != "not authenticated";
        setState({
            isLoggedin: isAuthenticated,
            isLoading: false 
        });
    }

    const setLoggedin = (isLoggedin: boolean) => {
        setState({
            isLoggedin: isLoggedin,
            isLoading: false 
        })
    }

    useEffect(() => {
        console.log('AuthContextProvider mount')
        getAuthenticatedUser();
    },[]);

    const { isLoggedin, isLoading } = state;
    const authState: AuthState = { isLoggedin, isLoading, setLoggedin }

    console.log('isLoggedin', isLoggedin);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}