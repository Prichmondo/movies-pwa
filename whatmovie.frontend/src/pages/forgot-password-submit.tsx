import React, { useState } from "react"
import SEO from "../components/seo"
import { forgotPasswordSubmit } from "../services/authService"
import { navigate, PageProps } from "gatsby"
import { Stack } from "../components/stack"
import PrivateRoute from "../components/privateRoute"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { FormCard } from "../components/card"
import { Typography } from "../components/typography"

type LocationState = {
  userName: string;
}

const ForgotPasswordSubmit = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
  const username = location.state ? location.state.userName : '';
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const response = await forgotPasswordSubmit(username, password, code);
      if(!response.success) {
        throw response.message;
      }
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
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
        
        <Stack>
          <Typography testid="title" component="h2" >Change Password</Typography>
          <Typography testid="preset-email">Email: {username}</Typography>
          <Input
            block
            disabled={isLoading}
            testid="code-input"
            type="text"
            name="verificationcode"
            placeholder="Enter the verification code" 
            onChange={handlCodeChange}
            value={code}
            />

          <Input
            block
            disabled={isLoading}
            testid="password-input"
            type="password"
            name="newPassword"
            placeholder="Enter a new password"
            onChange={handlPasswordChange}
            value={password}
            />

          <Button 
            testid="change-password-button"
            disabled={isLoading}
            loading={isLoading}
            block type="button"
            variant="primary"
            onClick={handleClick}
            >
            Change Password
          </Button>

          <Typography 
            testid="error-text"
            textColor="warning"
            hidden={error === '' || typeof error === undefined || !error}>
            Error: {error}
          </Typography>
        </Stack>
      </FormCard>
    </PrivateRoute>
  );
}

export default ForgotPasswordSubmit
