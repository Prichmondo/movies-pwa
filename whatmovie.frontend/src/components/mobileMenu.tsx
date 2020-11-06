import React, { useContext, FunctionComponent, useState } from "react"
import { Link } from "gatsby"
import styled, { css, useTheme } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Theme, WithThemeProps } from "../types/theme"
import { Menu } from '../icons/menu';
import { Grid } from "./grid"
import { GridItem } from "./gridItem"
import { HeaderSize } from "./headerSize"
import { Container } from "./container"
import { Clear } from "../icons/clear"
import { Account } from "../icons/account"
import { Star } from "../icons/star"
import { WatchList } from "../icons/watchList"
import { Power } from "../icons/power"
import { MenuItem } from "./menuItem"

type Props = {};

const MobileMenuComponent = ({}: Props) => {
  
  const theme = useTheme() as Theme;

  const { signOut } = useContext(AuthContext);
  const [ show, setShow ] = useState<boolean>(false);

  const handleMenuClick = () => {
    setShow(true);
  }

  const handleMenuItemClick = () => {
    setShow(false);
  }

  const handleCloseMenuClick = () => {
    setShow(false);
  }

  const handleSignOutClick = async () => {
    signOut();
    setShow(false);
  }

  return (
    <MenuStyle id="mobileMenu">
      <MenuPanel data-show={show}>
        <Container>
          <MenuHeaderContainer> 
            <Grid>
              <GridItem xs={5} valign="middle">
                <LogoImage src="/images/logo-blue.png" />
              </GridItem>
              <GridItem xs={7} align="right" valign="middle">
                <Clear onClick={handleCloseMenuClick} />
              </GridItem>
            </Grid>
            <hr/>
            <MenuItem 
              icon={<Account fill={theme.palette.secondary.main} width={30} height={30} />}>
              Identity:<br/>
              <b testid="header-username-mobile">riccardo.volpato@gmail.com</b>
            </MenuItem>
            <hr/>
            <MobileNav>
              <ul>
                <li>
                  <Link to="/browse" data-testid="header-browse-mobile-link" onClick={handleMenuItemClick}>
                    <MenuItem 
                      icon={<Star fill={theme.palette.secondary.main} />}>
                      Recommended
                    </MenuItem>
                  </Link>                                 
                </li>
                <li>
                  <Link to="/rated" data-testid="header-rated-mobile-link" onClick={handleMenuItemClick}>
                    <MenuItem 
                      icon={<WatchList fill={theme.palette.secondary.main}/>}>
                      Rated Movies
                    </MenuItem>
                  </Link>                  
                </li>
                <li>
                  <Link to="/mylist" data-testid="header-mylist-mobile-link" onClick={handleMenuItemClick}>
                    <MenuItem 
                      icon={<WatchList fill={theme.palette.secondary.main}/>}>
                      My List
                    </MenuItem>
                  </Link>                  
                </li>
                <li>
                  <MenuItem 
                    onClick={handleSignOutClick}
                    data-testid="logout-header-mobile"
                    icon={<Power fill={theme.palette.secondary.main} />}>
                    Loguot
                  </MenuItem>              
                </li>
              </ul>
            </MobileNav>
            <hr/>
          </MenuHeaderContainer>
        </Container>        
      </MenuPanel>
      <Menu 
        onClick={handleMenuClick}
        fill={theme.palette.tertiary.lighter}
        width="30"
        height="30"
        />
    </MenuStyle>
  )
};

const MenuHeaderContainer = styled(HeaderSize)``;


const MobileNav = styled.nav`
  ${({theme}: WithThemeProps) => {
    return css`
      padding-top: 15px;
      padding-bottom: 15px;

      ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      a, a:visited, a:hover {
        color: ${theme.palette.secondary.main};
        display: block;
      }
    `
  }}  
`

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const MenuPanel = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 100%;
      background-color: ${theme.palette.tertiary.lighter};
      z-index: 100;
      transition: left 0.5s ease;
      &[data-show="true"] {
        left: 0;
      }
    `
  }}
`

const MenuStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: none;
      @media (max-width: ${theme.breakPoints.md-1}px) {
        display: inline-block;
      }
    `
  }}
`

export const MobileMenu = styled<FunctionComponent<Props>>(MobileMenuComponent)({}, );
