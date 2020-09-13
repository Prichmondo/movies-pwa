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

  const { signOut } = useContext(AuthContext);

  const handleSignOutClick = async () => {
    signOut();
  }

  return (
    <MenuStyle id="DesktopMenu">
      <Button type="button" variant="primary" onClick={handleSignOutClick}>Sign out</Button>
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
