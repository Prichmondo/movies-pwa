import React, { FunctionComponent, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { BaseProps } from '../types/baseProps';
import { WithThemeProps } from '../types/theme';

type Props = {
  fluid?: boolean;
} & BaseProps;

export const Container = styled<FunctionComponent<Props>>(({ children, fluid, component, ...rest }: Props) => {
  return (
    <ContainerStyle
      as={component}
      data-fluid={fluid ? fluid : false}
      {...rest} 
    >
      {children}
    </ContainerStyle>
  );
})``;

const ContainerStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
      box-sizing: border-box;
      width: 100%;
      padding-left: ${theme.gutter}px;
      padding-right: ${theme.gutter}px;
      margin: 0 auto;

      &[data-fluid="false"]{
        max-width: 1360px;
      }

      @media(min-width: ${theme.breakPoints.sm}px) {
        padding-left: ${theme.gutter*2}px;
        padding-right: ${theme.gutter*2}px;
      }

      @media(min-width: ${theme.breakPoints.md}px) {
        padding-left: ${theme.gutter*4}px;
        padding-right: ${theme.gutter*4}px;
      }

      @media(min-width: ${theme.breakPoints.xl}px) {
        padding-left: ${theme.gutter*4}px;
        padding-right: ${theme.gutter*4}px;
      }
  `}
`;