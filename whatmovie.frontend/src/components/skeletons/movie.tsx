import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../../types/theme';
import { Grid } from '../grid';
import { GridItem } from '../gridItem';

interface Props {
  className?: string;
};

export const MovieSkeleton = ({ className }: Props) => {

  return (
    <MovieStyle className={className}>
      <MockMovieImage />
      <MovieInfo>
        <MockMovieTitle>
          <MockText />
          <MockText />
        </MockMovieTitle>        
        <MovieGrid>
          <GridItem xs={8} valign="middle" align="left">
            <MockIcon />
          </GridItem>
          <GridItem xs={4} valign="middle" align="right">
            <MockIcon />
          </GridItem>
        </MovieGrid>               
      </MovieInfo>
    </MovieStyle>
  );
}

const MockMovieImage = styled.div`
  ${({ theme }: WithThemeProps) => css`
    background-color: ${theme.palette.secondary.lighter};
    width: 100%;
    padding-bottom: 150%;
    opacity: 0.1;
  `}
`

const MockMovieTitle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: none;
    @media (min-width: ${theme.breakPoints.sm}px){
      display: block;
    }
    ${MockText} {
      margin-bottom: 10px;
      &:last-child {
        width: 60%;
      }
    }
  `}
`

const MockText = styled.div`
  ${({ theme }: WithThemeProps) => css`
    background-color: ${theme.palette.secondary.lighter};
    width: 100%;
    height: 10px;
    border-radius: 50px;
    opacity: 0.2;
  `}
`

const MockIcon = styled.div`
  ${({ theme }: WithThemeProps) => css`
    background-color: ${theme.palette.secondary.lighter};
    width: 100%;
    height: 17px;
    border-radius: 50px;
    opacity: 0.1;
  `}
`

const MovieGrid = styled(Grid)`
  margin-left: -5px;
  margin-right: -5px;
  
  ${GridItem} {
    padding-left: 5px;
    padding-right: 5px;
  }
`

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;

  & > * {
    flex-grow: 1;
  }
`;

const MovieStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    flex-direction: column;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    
    width: 100%;
    background-color: ${theme.palette.secondary.main};
    margin-bottom: ${theme.gutter}px;
    border: 2px solid transparent;
  `}
`;