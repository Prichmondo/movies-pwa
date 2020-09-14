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
import { ArrowDown } from "../icons/arrowDown"
import { hasValue } from "../utils"
import { Stack } from "./stack"
import { MenuItem } from "./menuItem"
import { Power } from "../icons/power"

type Props = {
  open?: boolean;
};

const AccountMenu = ({ open }: Props) => {

  const theme = useTheme() as Theme;
  const { signOut, user } = useContext(AuthContext);

  const handleSignOutClick = async () => {
    signOut();
  }

  const username = hasValue(user) ? user?.getUsername() : '';

  return (
    <AccountMenuStyle>
      <AccountMenuIconWrapper>
        <Account fill={theme.palette.primary.main}/>
        <ArrowDown fill={theme.palette.secondary.lighter}/>
      </AccountMenuIconWrapper>
      <MenuBoxWrapper>
        <MenuBox>
          <Stack>
            <b>{username}</b>
            <hr/>
            <LogoutAction onClick={handleSignOutClick} >
              <Power fill={theme.palette.secondary.main} />&nbsp;&nbsp;Loguot
            </LogoutAction>
          </Stack>
        </MenuBox>
      </MenuBoxWrapper>
    </AccountMenuStyle>
  )
};

const LogoutAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AccountMenuStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      position: relative;
      &:hover {
        ${MenuBoxWrapper} {
          opacity: 1;
          visibility: visible;
        }
      }
    `
  }}
`

const AccountMenuIconWrapper = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      cursor: pointer;
    `
  }}
`

const MenuBoxWrapper = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease;
      position: absolute;
      right: 0;
      padding-top: 5px;
    `
  }}
`

const MenuBox = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      min-width: 200px;
      background-color: ${theme.palette.secondary.lighter};
      border-radius: ${theme.borderRadius.md};
      padding: ${theme.gutter}px;
    `
  }}
`

export default AccountMenu
