import React, { Fragment, useContext, useState } from "react"
import { Link, navigate } from "gatsby"
import styled, { css, useTheme } from "styled-components"
import { Grid } from "./grid"
import { GridItem } from "./gridItem"
import DesktopMenu from "./desktopMenu"
import { MobileMenu } from "./mobileMenu"
import { Theme, WithThemeProps } from "../types/theme"
import { Container } from "./container"
import { useScroll } from "../hooks/useScroll";
import { HeaderSize } from "./headerSize"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import SearchInput from "./searchInput"
import { Search } from "../icons/search"
import { Media } from "./media"

const Header = () => {

  const { scrollY } = useScroll();
  const bgOpacity = scrollY >= 100 ? 1 : 0;
  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [search, setSearch] = useState<boolean>(false);
  const theme = useTheme() as Theme;
  
  const handleSignInClick = () => {
    navigate('/login');
  }

  const handleSearchClick = () => {
    setSearch(!search);
  }

  if(isInitializing) {
    return null;
  }  

  function getMenu() {

    if(!isLoggedin) {
      return <Button testid="signin-button" type="button" variant="primary" onClick={handleSignInClick}>Sign in</Button>
    }

    return (
      <Fragment>
        <DesktopMenu />
        <Media lessThan="md">
          <SearchButton onClick={handleSearchClick}>
            <Search fill={search ? theme.palette.primary.main : theme.palette.secondary.lighter} />
          </SearchButton>          
        </Media>
        <MobileMenu />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <HeaderWrapper as="header">
        <HeaderContainer fluid>
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
        </HeaderContainer>
      </HeaderWrapper>
      <HeaderBackground style={{ opacity: bgOpacity }}/>
      <HeaderPlaceholder />
      <MobileSearchDrawer data-open={search}>
        <SearchContainer>
          <SearchInput block expanded={true} /> 
        </SearchContainer>        
      </MobileSearchDrawer>  
    </Fragment>    
  )
};

const SearchButton = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      padding: ${theme.gutter/2}px;
      cursor: pointer;
      margin-right: ${theme.gutter/2}px;
    `
  }}
`

const SearchContainer = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      padding: ${theme.gutter}px;
    `
  }}
`

const MobileSearch = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      padding: ${theme.gutter}px;

      @media (min-width: ${theme.breakPoints.md}px){
        display: none;
      }
    `
  }}
`

const MobileSearchDrawer = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      
      transition: max-height .4s linear, opacity .4s linear;
      
      &[data-open="true"] {
        max-height: 100px;
        opacity: 1;
      }

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
      transition: opacity .2s ease;
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
