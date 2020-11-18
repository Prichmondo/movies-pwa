import React, { useState, useEffect } from "react"
import { PageProps } from "gatsby"
import { verifyEmailAddress } from "../services/authService"
import PrivateRoute from "../components/privateRoute"
import { FormCard } from "../components/card"
import { Stack } from "../components/stack"
import { Typography } from "../components/typography"
import { getQuerystringParams, hasValue } from "../utils"
import { PageContainer } from "../components/pageContainer"
import { EmailRead } from "../icons/emailRead"
import styled, { useTheme } from "styled-components"
import { Theme } from "../types/theme"
import { useTimer } from "../hooks/useTimer"
import { navigate } from 'gatsby';

type LocationState = {
  email: string;
}     

type State = {
  loading: boolean;
  error: string | undefined;
}

type PageParams = {
  email: string;
  code: string
}

const ConfirmRegistration = ({ location }: PageProps<unknown, unknown, LocationState>) => { 
  
  const { setTimer } = useTimer();
  const theme = useTheme() as Theme;
  const [state, setState] = useState<State>({
    loading: true, 
    error: undefined
  });

  async function init() {
    const params = getQuerystringParams<PageParams>(location.search);

    if(!params || !hasValue(params.email) || !hasValue(params.email)) {
      setState({
        ...state,
        loading: false,
        error: "email or code is not correct"
      });
    } else {
      
      const response = await verifyEmailAddress(params?.email, params?.code);
      if(response.success) {
        setState({
          ...state,
          loading: false,
        });
        setTimer(() => {
          navigate('/login');
        }, 4000);
      } else {
        setState({
          ...state,
          loading: false,
          error: response.message
        });
      } 

    }
  }

  useEffect(() => {
    init();
  }, []);

  function getTitle() {
    if(state.loading) {
      return "Verification in Progress...";
    }

    if(hasValue(state.error)) {
      return "Verification failed";
    }

    return "Verification Succededs"

  }

  function getText() {
    if(state.loading) {
      return "The system is verifying your data, it may require few seconds.";
    }

    if(hasValue(state.error)) {
      return state.error;
    }

    return "Your account has been activated, you will be redirected to the log-in page in few seconds"

  }

  const opacity = state.error || state.loading ? 0.3 : 1

  return (
    <PrivateRoute anonymousOnly>
      <PageContainer>
        <FormCard variant="black">
          <FinalMessageStack>
            <EmailRead fill={theme.palette.tertiary.main} width={50} height={50} style={{ opacity }} />
            <Typography testid="check-email-message-title" component="h2">
              {getTitle()}
            </Typography>
            <Typography testid="check-email-message-description">
              {getText()}
            </Typography>
          </FinalMessageStack>     
        </FormCard>
      </PageContainer>
    </PrivateRoute>
  )
    
}

const FinalMessageStack = styled(Stack)`
  svg {
    margin-left: auto;
    margin-right: auto;
    transition: opacity .4s linear;
  }
  & > * {
    text-align: center;
  }
`

export default ConfirmRegistration
