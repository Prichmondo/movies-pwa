import React, { useState } from "react"
import SEO from "../components/seo"
import { forgotPassword } from "../services/authService"
import { navigate, PageProps } from "gatsby"
import { Stack } from "../components/stack"
import { Input } from "../components/input"
import { Button } from "../components/button"
import PrivateRoute from "../components/privateRoute"
import { FormCard } from "../components/card"
import { Typography } from "../components/typography"
import styled from "styled-components"
import { PageContainer } from "../components/pageContainer"

const ForgotPassword = () => { 
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      if(!response.success) {
        throw response.message;
      }
      setIsLoading(false);
      navigate('/forgot-password-submit', { state: { userName: email } });
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const handleClick = () => {
    handleForgotPassword();
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <PrivateRoute anonymousOnly>
      <PageContainer>
        <SEO title="Home" />
        <FormCard variant="black">
          <Stack>
            
            <Typography testid="title" component="h2">
              Forgot Password
            </Typography>

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

            <Typography 
              testid="error-text"
              textColor="warning"
              hidden={error === '' || typeof error === undefined || !error}>
              Error: {error}
            </Typography>
            
          </Stack>
        </FormCard>
      </PageContainer>       
    </PrivateRoute>
  );
}

export default ForgotPassword
