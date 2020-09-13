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
import { Search } from "../icons/search"
import { Power } from "../icons/power"
import { Typography } from "./typography"

type Props = {};

const MobileMenuComponent = ({}: Props) => {
  
  const theme = useTheme() as Theme;

  const { signOut } = useContext(AuthContext);
  const [ show, setShow ] = useState<boolean>(false);

  const handleMenuClick = () => {
    setShow(true);
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
        <Container fluid>
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
            <MenuItem>
              <MenuIcon>
                <Account width={30} height={30} />
              </MenuIcon>
              <Typography as="div">
                Identity:<br/>
                <b>riccardo.volpato@gmail.com</b>
              </Typography>
            </MenuItem>
            <hr/>
            <MobileNav>
              <ul>
                <li>
                  <Link to="">
                    <MenuItem>
                      <MenuIcon>
                        <Star />
                      </MenuIcon>
                      <Typography as="div">
                        Recommendations
                      </Typography>
                    </MenuItem>   
                  </Link>                                 
                </li>
                <li>
                  <Link to="">
                    <MenuItem>
                      <MenuIcon>
                        <WatchList />
                      </MenuIcon>
                      <Typography as="div">
                        Watch List
                      </Typography>
                    </MenuItem>
                  </Link>                  
                </li>
                <li>
                  <Link to="">
                    <MenuItem>
                      <MenuIcon>
                        <Search />
                      </MenuIcon>
                      <Typography as="div">
                        Search
                      </Typography>
                    </MenuItem>
                  </Link>                  
                </li>
                <li>
                  <MenuItem onClick={handleSignOutClick}>
                    <MenuIcon>
                      <Power />
                    </MenuIcon>
                    <Typography as="div">
                      Loguot
                    </Typography>
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

const MenuIcon = styled.div`
  width: 50px;
  text-align: center;
`
const MobileNav = styled.nav`

  padding-top: 15px;
  padding-bottom: 15px;

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    display: block;
  }
`

const MenuItem = styled.nav`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  ${Typography} {
    align-self: center;
  }
  ${MenuIcon}, ${Typography} {
    padding-top: 10px;
    padding-bottom: 10px;
  }
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
