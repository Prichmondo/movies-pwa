import React, { useContext } from "react"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import { WithThemeProps } from "../types/theme"
import Image from 'gatsby-image';
import { MenuIcon } from '../icons/menuIcon';

type Props = {};

const MobileMenu = ({}: Props) => {

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
      <MenuIcon fill="#fff" width="30" height="30"/>
    </MenuStyle>
  )
};

const MenuStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: none;
      @media (max-width: ${theme.breakPoints.md-1}px) {
        display: block;
      }
    `
  }}
`

export default MobileMenu
