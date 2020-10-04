import React from "react"
import styled, { css } from "styled-components"
import { WithThemeProps } from "../types/theme"
import { Spinner } from "./spinner";

type Props = {
  show: boolean;
}

export function SpinnerPanel({ show }: Props) {
  return (
    <SpinnerPanelStyle data-visible={show}>
      <MovieSpinner variant="secondary"/>
    </SpinnerPanelStyle>
  ); 
}

const MovieSpinner = styled(Spinner)`
  position: fixed;
  opacity: 0.5;
  z-index: 2;
  left: 50%;
  top: 50%;
  margin-top: -30px;
  margin-left: -30px;
`;

const SpinnerPanelStyle = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`

      opacity: 0;
      visibility: hidden;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      &[data-visible="true"] {
        &, ${MovieSpinner} {
          opacity: 1;
          visibility: visible;
        }
      }

      &:after {
        content: '';
        position: absolute;
        display: block;
        background-color: ${theme.palette.secondary.darker};
        opacity: 0.6;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }

    `
  }}  
`