import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { signIn } from "../services/authService"

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
      <input 
        type="text" 
        placeholder="Enter your emmail" 
        onChange={handlEmailChange}
        value={email}
        /><br/>
      <input 
        type="password"
        placeholder="Enter a password"
        onChange={handlPasswordChange}
        value={password}
        /><br/>
      <button type="button" onClick={handleClick}>Register now</button>
    </Layout>
  );
}

const InputButton = styled.section`
  text-align: center;
`

export default Login
