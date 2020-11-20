import React, { Fragment, FunctionComponent, useContext } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { MovieSearchContext } from '../context/movieSearchContext';
import { IMovie } from '../domain/IMovie';
import { IPagingData } from '../domain/IPagingData';
import { searchMovies } from '../services/movieService';
import { BaseProps } from '../types/baseProps';
import { WithThemeProps } from '../types/theme';
import { Button } from './button';
import { Grid } from './grid';
import { GridItem } from './gridItem';

interface Props {
  onClick: (genre: string) => void;
  className?: string;
  component?: React.ElementType<any> | keyof JSX.IntrinsicElements;
};

export const GenresPanel = styled<FunctionComponent<Props>>(({
  onClick
}: Props) => {

  const genres = [
    { name: 'Adventure', value: 'Adventure' },
    { name: 'Animation', value: 'Animation' },
    { name: 'Children', value: 'Children' },
    { name: 'Comedy', value: 'Comedy' },
    { name: 'Fantasy', value: 'Fantasy' },
    { name: 'Romance', value: 'Romance' },
    { name: 'Drama', value: 'Drama' },
    { name: 'Action', value: 'Action' },
    { name: 'Crime', value: 'Crime' },
    { name: 'Thriller', value: 'Thriller' },
    { name: 'Horror', value: 'Horror' },
    { name: 'Mystery', value: 'Mystery' },
    { name: 'Science Fiction', value: 'Sci-Fi' },
    { name: 'War', value: 'War' },
    { name: 'Musical', value: 'Musical' },
    { name: 'Documentary', value: 'Documentary' },
    { name: 'Western', value: 'Western' },
    { name: 'Film-Noir', value: 'Noir' }
  ];

  const handleClick = (genre: string) => () => {
    onClick(genre);
  }
  
  return (
    <GenresPanelStyle>
      <Grid>
        {genres.map(genre => (
          <GridItem key={genre.name} xs={12} sm={6} md={4}>
            <Button 
              block
              testid={`${genre}-button`} 
              buttonSize="sm" 
              onClick={handleClick(genre.value)}>
              {genre.name}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </GenresPanelStyle>
  )
})``;

GenresPanel.defaultProps = {
  
}

const GenresPanelStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    button {
      font-weight: bold;
      margin-bottom: ${theme.gutter}px;
    }
  `}
`;