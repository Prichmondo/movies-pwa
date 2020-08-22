import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { forgotPassword } from "../services/authService"
import { navigate } from "gatsby"
import { Stack } from "../components/stack"

const ForgotPassword = () => { 
  
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = async () => {
    const response = await forgotPassword(email);
    console.log('forgotPassword response', response);
    navigate('/forgot-password-submit', { state: { userName: email } });
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleForgotPassword();
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Forgot Password</h1>
      <Stack>
        <input 
          type="text" 
          placeholder="Enter your emmail" 
          onChange={handlEmailChange}
          value={email}
          />
        <button type="button" onClick={handleClick}>Send Request</button>
      </Stack>      
    </Layout>
  );
}

export default ForgotPassword
