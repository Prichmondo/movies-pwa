import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

interface Props {
  children: ReactNode;
  fluid?: boolean;
};

export const Container = ({ children, fluid, ...rest }: Props) => {
  return (
    <ContainerStyle data-fluid={fluid} {...rest}>
      {children}
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
      box-sizing: border-box;
      width: 100%;
      padding: 0 ${theme.gutter}px;
      max-width: 1360px;
      margin: 0 auto;

      @media(min-width: ${theme.breakPoints.sm}px) {
        padding: 0 ${theme.gutter*2}px;
      }

      @media(min-width: ${theme.breakPoints.md}px) {
        padding: 0 ${theme.gutter*4}px;
      }

      @media(min-width: ${theme.breakPoints.xl}px) {
        padding: 0 ${theme.gutter*4}px;
      }
  `}
`;