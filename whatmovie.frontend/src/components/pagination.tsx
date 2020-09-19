import React, {  } from "react"
import styled, { css } from "styled-components"
import { WithThemeProps } from "../types/theme"
import { ChevronLeft } from "../icons/chevronLeft"
import { ChevronRight } from "../icons/chevronRight"

type Props = {
  current: number;
  total: number;
  onClick: (page: number) => void;
}

type PaginationItem = {
  display: string;
  value: number;
  selected: boolean;
}

const Pagination = ({ current, total, onClick}: Props) => {

  if(total <= 1) {
    return null;
  }

  const pages: PaginationItem[] = [];
  let start = current-4;
  if(start < 1) start = 1;
  let end = start + 8;
  if(total < end) end = total;
  
  for(let i = start, selected: boolean; i<=end; i++) {    
    selected = i === current;
    pages.push({
      display: `${i}`,
      value: i,
      selected
    });
  }

  if(end < total) {
    pages[pages.length-2] = {
      display: `...`,
      value: 0,
      selected: false
    }
    pages[pages.length-1] = {
      display: `${total}`,
      value: total,
      selected: false
    }
  }

  if(start > 1) {
    pages[1] = {
      display: `...`,
      value: 0,
      selected: false
    }
    pages[0] = {
      display: `1`,
      value: 1,
      selected: false
    }
  }


  const leftActive = current-1 > 0;
  const rightActive = current < total;
  const size = 35;
  return (
    <PaginationStyle>
      <ChevronLeft
        height={size}
        width={size}
        data-active={leftActive}
        onClick={leftActive ? () => onClick(current-1) : undefined}
        />
        {pages.map(({ display, value, selected }, i) => {
          return (
            <Page
              key={i}
              onClick={!selected  && value > 0 ? () => onClick(value) : undefined}
              data-aspect={value > 0 ? 'circle' : 'default'}
              data-selected={selected}>
              {display}
            </Page>
          )
        })}
      <ChevronRight
        height={size}
        width={size}
        data-active={rightActive}
        onClick={rightActive ? () => onClick(current+1) : undefined}
        />
    </PaginationStyle>
  )
};

const Page = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      color: ${theme.palette.tertiary.lighter};
      font-size: ${theme.typography.size.h4};
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: ${theme.palette.primary.main};
      }

      &[data-selected="true"]{
        font-weight: bold;
        cursor: initial;
        color: ${theme.palette.primary.main};
      }
    `
  }}  
`

const PaginationStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      display: flex;
      flex-direction: row;
      align-items: center;

      svg {
        fill: ${theme.palette.secondary.lighter};
        &[data-active="true"]{
          fill: ${theme.palette.primary.main};
          cursor: pointer;
        }
      }

    `
  }}  
`

export default Pagination
