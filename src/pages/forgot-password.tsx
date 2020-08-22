import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { PageProps } from "gatsby"
import { signIn } from "../services/authService"

type LocationState = {
  email: string;
}

const IndexPage = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
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
      <Register>
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
      </Register>
    </Layout>
  );
}

const Register = styled.section``;

const InputButton = styled.section`
  text-align: center;
`

export default IndexPage
