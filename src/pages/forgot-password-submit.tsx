import React, { useState, Fragment } from "react"
import SEO from "../components/seo"
import { forgotPasswordSubmit } from "../services/authService"
import { PageProps } from "gatsby"
import { Stack } from "../components/stack"

type LocationState = {
  userName: string;
}

const ForgotPasswordSubmit = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
  const username = location.state.userName;
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangePassword = async () => {
    const response = await forgotPasswordSubmit(username, password, code);
    console.log('SignIn response', response);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleChangePassword();
  }

  const handlCodeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const handlPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <Fragment>
      <SEO title="Home" />
      <h1>Change Password</h1>
      <Stack>
      <span>Email: {username}</span>
      <input 
        type="text"
        name="verificationcode"
        placeholder="Enter the verification code" 
        onChange={handlCodeChange}
        value={code}
        /><br/>
      <input 
        type="password"
        name="newPassword"
        placeholder="Enter a new password"
        onChange={handlPasswordChange}
        value={password}
        /><br/>
      <button type="button" onClick={handleClick}>Change Password</button>
      </Stack>
    </Fragment>
  );
}

export default ForgotPasswordSubmit
