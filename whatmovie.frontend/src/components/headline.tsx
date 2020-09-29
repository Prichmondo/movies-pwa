import React from 'react';
import styled, { css } from "styled-components";
import { WithThemeProps } from "../types/theme";

type Props = {
  children: string;
}

export const Headline = ({ children }: Props) => {
  return (
    <HeadlineStyle text={children}>
      {children}
    </HeadlineStyle>
  )
}


const HeadlineStyle = styled.h2`
  ${({ theme, text }: WithThemeProps & { text: string }) => {
    return css`
      margin-top: 40px;
      margin-bottom: 20px;
      font-style: italic;
      position: relative;
      z-index: 1;

      &:before {
        content: '${text}';
        display: block;
        position: absolute;
        z-index: -1;
        top: 1px;
        left: 1px;
        color: ${theme.palette.primary.lighter};
        width: 100%;
        opacity: .6;
      }

      &:after {
        content: '${text}';
        display: block;
        position: absolute;
        z-index: -1;
        top: -1px;
        left: -1px;
        color: ${theme.palette.tertiary.lighter};
        width: 100%;
        opacity: .4;
      }
    `
  }}
`;
