import { createContext } from "react";

export type AuthState = {
    isLoggedin: boolean;
    isLoading: boolean;
    setLoggedin: (isLoggedin: boolean) => void;
}

const defaultAuthState: AuthState = {
    isLoggedin: false,
    isLoading: true,
    setLoggedin: () => {}
}

export const AuthContext = createContext<AuthState>(defaultAuthState);