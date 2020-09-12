import React, { useContext } from "react"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import { Container } from "./container"
import { WithThemeProps } from "../types/theme"
import Image from 'gatsby-image';
import { Grid } from "./grid"
import { GridItem } from "./gridItem"

type Props = {};

const DesktopMenu = ({}: Props) => {

  const { isLoggedin, isInitializing, signOut } = useContext(AuthContext);

  const handleSignInClick = () => {
    navigate('/login');
  }

  const handleSignOutClick = async () => {
    signOut();
  }

  function getUserAction() {
    if(isInitializing) {
      return null;
    }

    if(isLoggedin) {
      return <Button type="button" variant="primary" onClick={handleSignOutClick}>Sign out</Button>
    }

    return <Button type="button" variant="primary" onClick={handleSignInClick}>Sign in</Button>
  }

  return (
    <MenuStyle>
      {getUserAction()}
    </MenuStyle>
  )
};

const MenuStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: none;
      @media (min-width: ${theme.breakPoints.md}px) {
        display: block;
      }
    `
  }}
`

export default DesktopMenu
