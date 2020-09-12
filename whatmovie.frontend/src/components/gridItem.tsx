import React, { ReactNode } from 'react';
import styled, { css, StyledComponentProps, FlattenSimpleInterpolation } from 'styled-components';
import { WithThemeProps, Color, Theme } from '../types/theme';
import { Spinner } from './spinner';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';

type GridItemProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number; 
}

const GridItemComponent = ({ children, xs, sm, md, lg, xl, ...rest }: StyledComponentProps<any, Theme, GridItemProps, any>) => {
  return (
    <GridItemStyle
      data-col-xs={xs}
      data-col-sm={sm}
      data-col-md={md}
      data-col-lg={lg}
      data-col-xl={xl}
      {...rest}>
      {children}
    </GridItemStyle>
  );
}

const GridItemStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: block;
    width: 100%;
    ${columnSizeMixin(theme, 'xs', 0)}
    ${columnSizeMixin(theme, 'sm', theme.breakPoints.sm)}
    ${columnSizeMixin(theme, 'md', theme.breakPoints.md)}
    ${columnSizeMixin(theme, 'lg', theme.breakPoints.lg)}
    ${columnSizeMixin(theme, 'xl', theme.breakPoints.xl)}
  `}
`;

const columnSizeMixin = (theme: Theme, bp: string, min: number) => {
  const colSize = 100/12;
  return css`
    @media (min-width: ${min}px) {
      &[data-col-${bp}='${1}'] { width: ${(colSize*1)}%; }
      &[data-col-${bp}='${2}'] { width: ${(colSize*2)}%; }
      &[data-col-${bp}='${3}'] { width: ${(colSize*3)}%; }
      &[data-col-${bp}='${4}'] { width: ${(colSize*4)}%; }
      &[data-col-${bp}='${5}'] { width: ${(colSize*5)}%; }
      &[data-col-${bp}='${6}'] { width: ${(colSize*6)}%; }
      &[data-col-${bp}='${7}'] { width: ${(colSize*7)}%; }
      &[data-col-${bp}='${8}'] { width: ${(colSize*8)}%; }
      &[data-col-${bp}='${9}'] { width: ${(colSize*9)}%; }
      &[data-col-${bp}='${10}'] { width: ${(colSize*10)}%; }
      &[data-col-${bp}='${11}'] { width: ${(colSize*11)}%; }
      &[data-col-${bp}='${12}'] { width: ${(colSize*12)}%; }
    }
    
  `
}

export const GridItem = styled(GridItemComponent)({});