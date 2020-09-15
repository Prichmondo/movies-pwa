import React, { useContext, ReactNode, Fragment } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/authContext"

type PrivateRouteProps = {
    children: ReactNode;
    isLoginPage?: boolean;
    anonymousOnly?: boolean;
}

const PrivateRoute = ({ children, anonymousOnly, isLoginPage }: PrivateRouteProps) => {

    const { isLoggedin, isInitializing } = useContext(AuthContext);

    if(isInitializing) {
        return null;
    }
    
    if(anonymousOnly && isLoggedin) {
        navigate("/recommended");
        return null;
    }
    
    if (!anonymousOnly && !isLoggedin && !isLoginPage) {
        navigate("/login");
        return null;
    }

    return <>{children}</>;
}

export default PrivateRoute
