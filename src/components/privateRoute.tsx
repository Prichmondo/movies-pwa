import React, { useContext, ReactNode, Fragment } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/authContext"

type PrivateRouteProps = {
    children: ReactNode;
    isLoginPage?: boolean;
    anonymousOnly?: boolean;
}

const PrivateRoute = ({ children, anonymousOnly, isLoginPage }: PrivateRouteProps) => {

    const { isLoggedin, isLoading } = useContext(AuthContext);

    if(isLoading) {
        return null;
    }
    
    if(anonymousOnly && isLoggedin) {
        navigate("/movies");
        return null;
    }
    
    if (!anonymousOnly && !isLoggedin && !isLoginPage) {
        navigate("/login");
        return null;
    }

    return <>{children}</>;
}

export default PrivateRoute
