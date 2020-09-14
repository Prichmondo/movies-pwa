import React, { useContext, useState } from "react"
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
import { Props as InputProps } from './input';

type Props = {
  expanded?: boolean;
} & InputProps

const SearchInput = (props: Props) => {

  const theme = useTheme() as Theme;
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  }

  const handleBlur = () => {
    setFocus(false);
  }

  return (
    <SearchInputStyle 
      data-focus={focus}
      >
      <Search fill={theme.palette.primary.main} />
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        variant="secondary" 
        name="earch-movie" 
        placeholder="Search movie" 
        {...props}
        />
    </SearchInputStyle>
  )
};

const SearchInputStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      position: relative;
      width: 200px;
      transition: width .4s ease;

      svg {
        fill: ${theme.palette.primary.main};
        transition: all .4s ease;
        position: absolute;
        top: 50%;
        margin-top: -12px;
        left: 12px;
      }

      input {
        width: 100%;
        padding-left: 40px;
        transition: all .4s ease;
        cursor: initial;
      }

      &[data-focus="false"] {
        width: 24px;
        svg {          
          fill: ${theme.palette.secondary.lighter};
          left: 0;
          z-index: -1;
        }
        input{
          cursor: pointer;
          border-color: transparent;
          background-color: transparent;
          padding-left: 0;
          padding-right: 0;
          
          &[data-variant="secondary"]::placeholder {
            opacity: 0;            
          }

        }
      }
    `
  }}  
`

export default SearchInput
