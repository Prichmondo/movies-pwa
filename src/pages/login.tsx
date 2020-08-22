import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { signIn } from "../services/authService"
import { Link } from "gatsby"
import { Stack } from "../components/stack"

const Login = () => { 
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    console.log('SignIn response', response);
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
    <Layout>
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
    </Layout>
  );
}

export default Login
