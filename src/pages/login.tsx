import React, { useState, useContext } from "react";
import { Link, PageProps, navigate } from "gatsby";
import { Stack } from "../components/stack";
import SEO from "../components/seo";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Card } from "../components/card";
import styled from "styled-components";

const Login = (props: PageProps) => { 
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn } = useContext(AuthContext);

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
      <LoginCard variant="black">
        <h1>Sign in</h1>
        <Stack>        
          <Input 
            type="text" 
            placeholder="Enter your emmail"
            block
            onChange={handlEmailChange}
            value={email}
            />
          <Input 
            type="password"
            placeholder="Enter a password"
            block
            onChange={handlPasswordChange}
            value={password}
            />
          <Link to="/forgot-password">Forgot password?</Link>
          <Button 
            type="button" 
            variant="primary"
            block
            onClick={handleClick}
            >
            Sign in now
          </Button>
        </Stack>  
      </LoginCard>          
    </PrivateRoute>
  );
}

const LoginCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
`


export default Login
