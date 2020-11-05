import React, { useState, Fragment } from "react"
import { PageProps, Link } from "gatsby"
import { signUp } from "../services/authService"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"
import { FormCard } from "../components/card"
import { Stack } from "../components/stack"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Typography } from "../components/typography"
import { hasValue } from "../utils"
import { Container } from "../components/container"

type LocationState = {
  email: string;
}

const Register = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
  const hasEmail = hasValue(location.state) && hasValue(location.state.email);
  const stateEmail = hasEmail ? location.state.email : '';  
  const [email, setEmail] = useState<string>(stateEmail);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignUp = async () => {
    setLoading(true);
    const response = await signUp(email, password);
      if(response.success) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError(response.message || 'Error');
        setLoading(false);
      }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSignUp();
  }

  const handlPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  function getEmail() {
    if(hasEmail) {
      return <>
        <p>Enter your password to complete the registration</p>
        <p>Email: {email}</p>
      </>
    }

    return <Input
      testid="email-input"
      disabled={loading}
      block
      type="email"
      name="email"
      placeholder="Enter your email"
      onChange={handlEmailChange} 
      />
  }

  function getContent() {
    if(success) {
      return <>
        <h2>Registration almost completed!</h2>
        <p>Check your mailbox and click on the confirmation link to complete the registration.</p>
      </>      
    }

    return <>
      <Stack>
        <h2>Registration</h2>
        {getEmail()}
        <Input 
          testid="password-input" 
          error={true}
          disabled={loading}
          block 
          type="password" 
          name="password" 
          placeholder="Enter a password" 
          onChange={handlPasswordChange} 
          />
        <Button 
          testid="register-button" 
          disabled={loading}
          loading={loading}
          block
          variant="primary"
          type="button"
          onClick={handleClick}
          >
          Register now
        </Button>
        <Typography testid="signin-text">
          Do you already have an account? <Link data-testid="signin-link" to="/login">Sign in here</Link>
        </Typography>
        <Typography testid="error-text" textColor="warning" hidden={error === '' || typeof error === undefined || !error}>Error: {error}</Typography>
      </Stack>  
    </>     
  }

  return (
    <PrivateRoute anonymousOnly>
      <Container>
        <SEO title="Home" />
        <FormCard variant="black">
          {getContent()}      
        </FormCard>
      </Container>
    </PrivateRoute>
  );
}

export default Register
