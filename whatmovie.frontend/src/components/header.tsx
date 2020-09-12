import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import styled, { css } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import { Grid } from "./grid"
import { GridItem } from "./gridItem"
import DesktopMenu from "./desktopMenu"
import MobileMenu from "./mobileMenu"
import { WithThemeProps } from "../types/theme"
import { Container } from "./container"

type Props = {
}

const Header = ({}: Props) => {

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
    <HeaderWrapper>
      <HeaderContainer>
        <Grid>
          <GridItem xs={5}>
            <Link to="/" style={{ display: 'inline-block' }}>
              <LogoImage src="/images/logo.png" />
            </Link>
          </GridItem>
          <GridItem xs={7} align="right" valign="middle">
            <DesktopMenu />
            <MobileMenu />
          </GridItem>
        </Grid>
      </HeaderContainer>
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.header`
  ${({theme}: WithThemeProps) => {
    return css`
      background-color: ${theme.palette.secondary.main};
    `
  }}
`

const HeaderContainer = styled(Container)`
  ${({theme}: WithThemeProps) => {
    return css`
      padding-top: ${12}px;
      padding-bottom: ${8}px;
    `
  }}
`

const LogoImage = styled.img`
  width: 100%;
  max-width: 240px;
`

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
