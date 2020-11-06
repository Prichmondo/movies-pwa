import React, { useContext } from "react"
import styled, { css, useTheme } from "styled-components"
import { AuthContext } from "../context/authContext"
import { Theme, WithThemeProps } from "../types/theme"
import { Account } from "../icons/account"
import { ArrowDown } from "../icons/arrowDown"
import { hasValue } from "../utils"
import { Stack } from "./stack"
import { Power } from "../icons/power"
import { Typography } from "./typography"

type Props = {
  open?: boolean;
};

const AccountMenu = ({ }: Props) => {

  const theme = useTheme() as Theme;
  const { signOut, user } = useContext(AuthContext);

  const handleSignOutClick = async () => {
    signOut();
  }

  const username = hasValue(user) ? user?.getUsername() : '';

  return (
    <AccountMenuStyle data-testid="header-account-menu">
      <AccountMenuIconWrapper>
        <Account fill={theme.palette.primary.main}/>
        <ArrowDown fill={theme.palette.secondary.lighter}/>
      </AccountMenuIconWrapper>
      <MenuBoxWrapper>
        <MenuBox>
          <Stack>
            <b data-testid="header-username-desktop">{username}</b>
            <hr/>
            <LogoutAction data-testid="header-logout-desktop" onClick={handleSignOutClick} >
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
  ${({}: WithThemeProps) => {
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
  ${({}: WithThemeProps) => {
    return css`
      cursor: pointer;
    `
  }}
`

const MenuBoxWrapper = styled.div`
  ${({}: WithThemeProps) => {
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
      background-color: ${theme.palette.tertiary.lighter};
      border-radius: ${theme.borderRadius.md};
      padding: ${theme.gutter}px;
    `
  }}
`

export default AccountMenu
