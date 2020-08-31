import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate, PageProps } from "gatsby"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { searchMovies } from "../services/movieService"

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

  const getMovies = async ()=> {
    const result = await searchMovies();
    console.log(result);
  }

  useEffect(()=>{
    getMovies();
  },[])

  return (
    <PrivateRoute anonymousOnly>
      <HomeContent>
        <SEO title="Home" />
        <h1>Find movies to enjoy!</h1>
        <h2>WhatMovie generates personalized predictions for movies you haven't seen yet</h2>
        <p>Ready to find the right movie? Enter your email to create an account.</p>
        <InputButton>
          <Input 
            type="text"
            inputSize="lg"
            placeholder="Enter your emmail" 
            onChange={handlEmailChange}
            value={email}
            />
          <Button 
            type="button"
            buttonSize="lg"
            variant="primary"
            onClick={handleClick}
            >
            Get Started &gt; 
          </Button>
        </InputButton>
      </HomeContent>
    </PrivateRoute>
  );
}

const HomeContent = styled.section`
  text-align: center;
  max-width: 600px;
  margin: 80px auto;
`

const InputButton = styled.div`

  display: flex;
  max-width: 500px;
  margin: 0 auto;

  input {
    flex-grow: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

export default IndexPage
