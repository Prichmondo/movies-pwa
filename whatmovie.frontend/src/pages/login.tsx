import React, { useState, useContext } from "react";
import { Link, PageProps, navigate } from "gatsby";
import { Stack } from "../components/stack";
import SEO from "../components/seo";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { FormCard } from "../components/card";
import { Typography } from "../components/typography";
import styled from "styled-components";
import { Container } from "../components/container";

const Login = (props: PageProps) => { 
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn, isLoginLoading, error } = useContext(AuthContext);

  const handleSignIn = async () => {
    signIn(email, password);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSignIn();
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <PrivateRoute anonymousOnly isLoginPage>
      <SEO title="Login" />
      <LoginContainer fluid>
        <FormCard variant="black">
          <h2>Sign in</h2>
          <Stack>        
            <Input 
              type="text" 
              placeholder="Enter your emmail"
              block
              disabled={isLoginLoading}
              onChange={handlEmailChange}
              value={email}
              />
            <Input 
              type="password"
              placeholder="Enter a password"
              block
              disabled={isLoginLoading}
              onChange={handlPasswordChange}
              value={password}
              />
            <div>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>          
            <Button 
              type="button" 
              variant="primary"
              block
              disabled={isLoginLoading}
              loading={isLoginLoading}
              onClick={handleClick}
              >
              Sign in now
            </Button>
            <Typography>
              Do not have an account? <Link to="/register">Sign up here</Link>
            </Typography>
            <Typography textColor="warning" hidden={error === '' || typeof error === undefined || !error}>Error: {error}</Typography>
          </Stack>  
        </FormCard>   
      </LoginContainer>       
    </PrivateRoute>
  );
}

const LoginContainer = styled(Container)`
  padding-top: 40px;
`

export default Login
