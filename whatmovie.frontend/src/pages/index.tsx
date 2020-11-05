import React, { useState } from "react"
import styled, { css } from "styled-components"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import PrivateRoute from "../components/privateRoute"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Container } from "../components/container"
import { Stack } from "../components/stack"
import { ChevronRight } from "../icons/chevronRight"
import { WithThemeProps } from "../types/theme"
import { Media } from "../components/media"

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
    <PrivateRoute anonymousOnly>
      <HomeContainer>
        <Stack>
          <SEO title="Home" />
          <h1>Find movies to enjoy!</h1>
          <h2>WhatMovie generates personalized recommendations for movies you haven't seen yet</h2>
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
              Get Started <ChevronRight fill="#fff" />
            </Button>
          </InputButton>
          
        </Stack>        
      </HomeContainer>
    </PrivateRoute>
  );
}

const HomeContainer = styled(Container)`
  text-align: center;
  max-width: 700px;
  margin: 80px auto;
`

const InputButton = styled.div`
  ${({ theme }: WithThemeProps) => css`

    input, input[data-size="lg"],
    button, button[data-size="lg"] {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }
    
    button, button[data-size="lg"] {
      justify-content: center;
    }

    @media (min-width: ${theme.breakPoints.sm}px ) {
      display: flex;
      max-width: 500px;
      margin: 0 auto;

      input, input[data-size="lg"],
      button, button[data-size="lg"] {
        width: auto;
        margin-bottom: 0;
      }

      input, input[data-size="lg"] {
        flex-grow: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      button, button[data-size="lg"] {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }    
  `}  
`
export default IndexPage
