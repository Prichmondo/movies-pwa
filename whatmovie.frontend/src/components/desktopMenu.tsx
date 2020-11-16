import React from "react"
import { Link } from "gatsby"
import styled, { css, useTheme } from "styled-components"
import { Theme, WithThemeProps } from "../types/theme"
import SearchInput from "./searchInput"
import AccountMenu from "./AccountMenu"

type Props = {};

const DesktopMenu = ({}: Props) => {


  return (
    <MenuStyle id="DesktopMenu">

      <MenuElement>
        <Link data-testid="header-browse-desktop-link" to="/browse">
          Home
        </Link>
      </MenuElement>

      <MenuElement>
        <Link data-testid="header-rated-desktop-link" to="/rated">
          Rated Movies
        </Link>
      </MenuElement>

      <MenuElement>
        <Link data-testid="header-mylist-desktop-link" to="/mylist">
          My List
        </Link>
      </MenuElement>

      <MenuElement>
        <SearchInput testid="header-search-input-desktop"/>
      </MenuElement>

      <MenuElement>
        <AccountMenu />
      </MenuElement>

    </MenuStyle>
  )
};

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
  ${({}: WithThemeProps) => {
    return css`
      display: flex;
      align-items: center;
    `
  }}
`

export default DesktopMenu
