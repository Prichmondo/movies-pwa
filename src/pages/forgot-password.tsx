import React, { useState, Fragment } from "react"
import SEO from "../components/seo"
import { forgotPassword } from "../services/authService"
import { navigate, PageProps } from "gatsby"
import { Stack } from "../components/stack"

const ForgotPassword = (props: PageProps) => { 
  
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
    <Fragment>
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
    </Fragment>
  );
}

export default ForgotPassword
