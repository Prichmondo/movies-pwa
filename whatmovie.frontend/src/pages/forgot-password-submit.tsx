import React, { useState, Fragment } from "react"
import SEO from "../components/seo"
import { forgotPasswordSubmit } from "../services/authService"
import { PageProps } from "gatsby"
import { Stack } from "../components/stack"
import PrivateRoute from "../components/privateRoute"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { FormCard } from "../components/card"

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
   <PrivateRoute anonymousOnly>
      <SEO title="Home" />
      <FormCard variant="black">
        <h2>Change Password</h2>
        <Stack>
          <p>Email: {username}</p>
          <Input
            block
            type="text"
            name="verificationcode"
            placeholder="Enter the verification code" 
            onChange={handlCodeChange}
            value={code}
            />
          <Input
            block
            type="password"
            name="newPassword"
            placeholder="Enter a new password"
            onChange={handlPasswordChange}
            value={password}
            />
          <Button block type="button" variant="primary" onClick={handleClick}>Change Password</Button>
        </Stack>
      </FormCard>
    </PrivateRoute>
  );
}

export default ForgotPasswordSubmit
