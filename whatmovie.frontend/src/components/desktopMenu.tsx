import React, { useContext } from "react"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import styled, { css, useTheme } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"
import { Container } from "./container"
import { Theme, WithThemeProps } from "../types/theme"
import Image from 'gatsby-image';
import { Grid } from "./grid"
import { GridItem } from "./gridItem"
import { Input } from "./input"
import { Account } from "../icons/account"
import { Search } from "../icons/search"
import { Star } from "../icons/star"
import { WatchList } from "../icons/watchList"
import SearchInput from "./searchInput"
import AccountMenu from "./AccountMenu"

type Props = {};

const DesktopMenu = ({}: Props) => {

  const theme = useTheme() as Theme;
  const { signOut } = useContext(AuthContext);

  const handleSignOutClick = async () => {
    signOut();
  }

  return (
    <MenuStyle id="DesktopMenu">

      <MenuElement>
        <Link to="/watchlist">
          <LinkText>Whatch List</LinkText>
          <WatchList fill={theme.palette.secondary.lighter} />
        </Link>        
      </MenuElement>

      <MenuElement>
        <Link to="/recommended">
          <LinkText>Recommended</LinkText>
          <Star fill={theme.palette.secondary.lighter} />
        </Link>
      </MenuElement>

      <MenuElement>
        <SearchInput />
      </MenuElement>

      <MenuElement>
        <AccountMenu />
      </MenuElement>

    </MenuStyle>
  )
};

const LinkText = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: none;
      @media(min-width: ${theme.breakPoints.lg}px) {
        margin-right: 5px;
        display: inline;
      }
    `
  }}  
`

const MenuElement = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: flex;
      padding: 0 ${theme.gutter}px;
      
      a {
        display: flex;
        align-items: center;

        span {
          margin-right: 5px;
        }
      }
    `
  }}  
`

const MenuStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      
      display: none;
      align-items: center;

      @media (min-width: ${theme.breakPoints.md}px) {
        display: flex;
      }
    `
  }}
`

export default DesktopMenu
