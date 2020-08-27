import React, { useState, Fragment } from "react"
import { PageProps } from "gatsby"
import { signUp } from "../services/authService"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"
import { FormCard } from "../components/card"
import { Stack } from "../components/stack"
import { Input } from "../components/input"
import { Button } from "../components/button"

type LocationState = {
  email: string;
}

const Register = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
  const email = location.state ? location.state.email : '';
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    const response = await signUp(email, password);
    console.log('SignUp response', response);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSignUp();
  }

  const handlPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <PrivateRoute anonymousOnly>
      <SEO title="Home" />
      <FormCard variant="black">
        <h2>Complete registration</h2>
        <Stack>
          <p>Enter your password to complete the registration</p>
          <p>Email: {email}</p>
          <Input block type="password" placeholder="Enter a password" onChange={handlPasswordChange} />
          <Button block variant="primary" type="button" onClick={handleClick}>Register now</Button>
        </Stack>        
      </FormCard>
    </PrivateRoute>
  );
}

export default Register
