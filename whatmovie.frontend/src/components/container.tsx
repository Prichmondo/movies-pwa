import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export const Container = styled.div`
  ${({ theme }: WithThemeProps) => css`
      box-sizing: border-box;
      width: 100%;
      padding-left: ${theme.gutter*1.5}px;
      padding-right: ${theme.gutter*1.5}px;
      max-width: 1360px;
      margin: 0 auto;

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