import React, { useContext, useEffect, useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { Theme, WithThemeProps } from "../types/theme"
import { Input } from "./input"
import { Search } from "../icons/search"
import { Props as InputProps } from './input';
import { MovieSearchContext } from "../context/movieSearchContext"
import { hasValue } from "../utils"
import { globalHistory } from "@reach/router"
import { navigate } from "gatsby"
import { useTimer } from "../hooks/useTimer"

type Props = {
  expanded?: boolean;
} & InputProps

const SearchInput = ({ expanded, block, ...rest }: Props) => {

  const { searchTerm, setSearchTerm } = useContext(MovieSearchContext);
  const theme = useTheme() as Theme;
  const [focus, setFocus] = useState(false);
  const { setTimer } = useTimer();

  const handleFocus = () => {
    setFocus(true);
  }

  const handleBlur = () => {
    setFocus(false);
  }

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const path = globalHistory.location.pathname;    
    setTimer(() => {
      setSearchTerm(value);
      if(value !== '' && path !== '/movies') {
        navigate('/movies');
      } 
      
      if(value == '' && path == '/movies') {
        if(window) {
          navigate('/recommended');
        }
      }
    }, 500);
  }
  
  const active = focus || hasValue(searchTerm) || typeof expanded !== 'undefined';

  return (
    <SearchInputStyle 
      data-active={active}
      data-block={block}
      >
      <Search fill={theme.palette.primary.main} />
      <Input
        defaultValue={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        variant="secondary" 
        name="earch-movie" 
        placeholder="Search movie"
        block={block}
        {...rest}
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

      &[data-block="true"] {
        width: 100%;
      }

      &[data-active="false"] {
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
