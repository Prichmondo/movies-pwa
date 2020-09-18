import React, { Fragment, useContext } from "react"
import { Link, navigate } from "gatsby"
import styled, { css } from "styled-components"
import { Grid } from "./grid"
import { GridItem } from "./gridItem"
import DesktopMenu from "./desktopMenu"
import { MobileMenu } from "./mobileMenu"
import { WithThemeProps } from "../types/theme"
import { Container } from "./container"
import { useScroll } from "../hooks/useScroll";
import { HeaderSize } from "./headerSize"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import SearchInput from "./searchInput"

type Props = {
}

const Header = ({}: Props) => {

  const { scrollY } = useScroll();
  const bgOpacity = (scrollY < 200 ? scrollY : 200)/4;
  const { isLoggedin, isInitializing, signOut } = useContext(AuthContext);
  
  const handleSignInClick = () => {
    navigate('/login');
  }

  if(isInitializing) {
    return null;
  }  

  function getMenu() {

    if(!isLoggedin) {
      return <Button type="button" variant="primary" onClick={handleSignInClick}>Sign in</Button>
    }

    return (
      <Fragment>
        <DesktopMenu />
        <MobileMenu />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <HeaderWrapper as="header">
        <HeaderContainer>
          <Grid>
            <GridItem xs={5} md={4} valign="middle">
              <Link to="/" style={{ display: 'inline-block' }}>
                <LogoImage src="/images/logo.png" />
              </Link>
            </GridItem>
            <GridItem xs={7} md={8} align="right" valign="middle">
              {getMenu()}
            </GridItem>
          </Grid>      
          <MobileSearch>
            <SearchInput block expanded={true} />
          </MobileSearch>    
        </HeaderContainer>
      </HeaderWrapper>
      <HeaderBackground style={{ opacity: bgOpacity/100 }}/>
      <HeaderPlaceholder />
    </Fragment>    
  )
};

const MobileSearch = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      margin-top: 10px;
      @media (min-width: ${theme.breakPoints.md}px){
        display: none;
      }
    `
  }}
`

const HeaderPlaceholder = styled(HeaderSize)`
  width: 100%;
`

const HeaderBackground = styled(HeaderSize)`
  ${({theme}: WithThemeProps) => {
    return css`
      transition: opacity .4s ease;
      background-color: ${theme.palette.secondary.main};
      box-shadow: 0px 0px 57px 16px rgba(0,0,0,0.47);
      position: fixed;
      z-index: 1;
      width: 100%;
    `
  }}
`

const HeaderWrapper = styled(HeaderSize)`
  position: fixed;
  z-index: 2;
  width: 100%;
`

const HeaderContainer = styled(Container)`
  ${({theme}: WithThemeProps) => {
    return css`
      padding-top: ${12}px;
      padding-bottom: ${8}px;
      
      ${Grid}, ${GridItem} {
        height: 50px;
      }

      @media(min-width: ${theme.breakPoints.sm}px) {
        ${Grid}, ${GridItem} {
          height: 60px;
        }
      }

      @media(min-width: ${theme.breakPoints.md}px) {
        ${Grid}, ${GridItem} {
          height: inherit;
        }
      }
    `
  }}
`

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
