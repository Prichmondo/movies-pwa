import styled, { css } from "styled-components"
import { WithThemeProps } from "../types/theme"

export const HeaderSize = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`
      transition: height .4s ease;
      height: 70px;

      @media (min-width: ${theme.breakPoints.sm}px){
        height: 70px;
      }

      @media (min-width: ${theme.breakPoints.md}px){
        height: 80px;
      }

      @media (min-width: ${theme.breakPoints.lg}px){
        height: 90px;
      }
    `
  }}
`