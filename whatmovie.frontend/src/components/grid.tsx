import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps, Color } from '../types/theme';
import { GridItem } from './gridItem';

type GridProps = {
  children: ReactNode;
  className?: string;
};

export const Grid = ({ children, ...rest }: GridProps) => {
  return (
    <GridStyle {...rest}>
      {children}
    </GridStyle>
  );
}

const GridStyle = styled.div`
  ${({ theme }: WithThemeProps) => { 
    
    const gridGutter = theme.gutter/2;

    return css`
    
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: -${gridGutter}px;
      margin-right: -${gridGutter}px;

      ${GridItem} {
        padding-left: ${gridGutter}px;
        padding-right: ${gridGutter}px;
      }

    `}
  }
`;