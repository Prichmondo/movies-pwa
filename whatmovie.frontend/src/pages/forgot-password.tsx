import React, { useState, Fragment } from "react"
import SEO from "../components/seo"
import { forgotPassword } from "../services/authService"
import { navigate, PageProps } from "gatsby"
import { Stack } from "../components/stack"
import { Input } from "../components/input"
import { Button } from "../components/button"
import PrivateRoute from "../components/privateRoute"
import { FormCard } from "../components/card"
import { Spinner } from "../components/spinner"

const ForgotPassword = (props: PageProps) => { 
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = async () => {
    setIsLoading(true);
    const response = await forgotPassword(email);
    console.log('ForgotPassword response', response)
    setIsLoading(false);
    navigate('/forgot-password-submit', { state: { userName: email } });
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleForgotPassword();
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <PrivateRoute anonymousOnly>
      <SEO title="Home" />
      <FormCard variant="black">
        <h2>Forgot Password</h2>
        <Stack>
          <Input
            block
            testid="email-input"
            name="email"
            disabled={isLoading}
            type="text" 
            placeholder="Enter your emmail" 
            onChange={handlEmailChange}
            value={email}
            />
          <Button 
            block
            testid="submit-button"
            disabled={isLoading}
            loading={isLoading}
            type="button" 
            variant="primary" 
            onClick={handleClick}>
              Submit Request
          </Button>
          
        </Stack>
      </FormCard>   
    </PrivateRoute>
  );
}

export default ForgotPassword
