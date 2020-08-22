import React, { useState, Fragment } from "react"
import styled from "styled-components"
import { navigate, PageProps } from "gatsby"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"

const IndexPage = (props: PageProps) => {
  
  const [email, setEmail] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/register', { 
      state: { email }
    });
  }

  const handlEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <PrivateRoute anonymousOnly>
      <Home>
        <SEO title="Home" />
        <h1>Find the Movie to enjoy today!</h1>
        <h2>WhatMovie generates personalized predictions for movies you haven't seen yet</h2>
        <p>Ready to find the right movie? Enter your email to create an account.</p>
        <InputButton>
          <input 
            type="text" 
            placeholder="Enter your emmail" 
            onChange={handlEmailChange}
            value={email}
            />
          <button 
            type="button"
            onClick={handleClick}
            >
            Get Started &gt; 
          </button>
        </InputButton>
      </Home>
    </PrivateRoute>
  );
}

const Home = styled.section`
  text-align: center;
`

const InputButton = styled.section`
  text-align: center;
`

export default IndexPage
