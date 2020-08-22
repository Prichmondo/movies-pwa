import React, { useState, useContext } from "react";
import { Link, PageProps, navigate } from "gatsby";
import { signIn } from "../services/authService";
import { Stack } from "../components/stack";
import SEO from "../components/seo";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";

const Login = (props: PageProps) => { 
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setLoggedin } = useContext(AuthContext);

  const handleSignIn = async () => {
    const response = await signIn(email, password) as any;
    console.log('SignIn response', response);
    if(response.username) {      
      setLoggedin(true);
      navigate('/movies');
    }
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
      <SEO title="Home" />
      <h1>Sign in</h1>
      <Stack>        
        <input 
          type="text" 
          placeholder="Enter your emmail" 
          onChange={handlEmailChange}
          value={email}
          />
        <input 
          type="password"
          placeholder="Enter a password"
          onChange={handlPasswordChange}
          value={password}
          />
        <Link to="/forgot-password">Forgot password?</Link>
        <button type="button" onClick={handleClick}>Sign in now</button>
      </Stack>      
    </PrivateRoute>
  );
}

export default Login
