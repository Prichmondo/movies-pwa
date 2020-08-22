import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { navigate } from "gatsby"

const IndexPage = () => {
  
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
    <Layout>
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
    </Layout>
  );
}

const Home = styled.section`
  text-align: center;
`

const InputButton = styled.section`
  text-align: center;
`

export default IndexPage
