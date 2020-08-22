import React, { useState, Fragment } from "react"
import { PageProps } from "gatsby"
import { signUp } from "../services/authService"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"

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
      <h1>Complete registration</h1>
      <p>Enter your password to complete the registration</p>
      <label>Email:</label>
      <div>{email}</div><br/>
      <input type="password" placeholder="Enter a password" onChange={handlPasswordChange} />
      <button type="button" onClick={handleClick}>Register now</button>
    </PrivateRoute>
  );
}

export default Register
