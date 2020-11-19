import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IMovie } from '../domain/IMovie';
import { IPagingData } from '../domain/IPagingData';
import { getPopularMovies } from '../services/movieService';
import { WithThemeProps } from '../types/theme';
import { Button } from './button';
import { Card } from './card';
import { GenresPanel } from './genresPanel';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import MoviesList from './moviesList';
import { Stack } from './stack';

interface Props {
  className?: string;
  component?: React.ElementType<any> | keyof JSX.IntrinsicElements;
  onWizardDone: () => void;
};

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
  genre: string | undefined;
  count: number;
  page: number;
}

export const NewUserWizard = styled<FunctionComponent<Props>>(({
  onWizardDone
}: Props) => {

  const minRatings = 5;
  const [ state, setState ] = useState<State>({
    loading: true,  
    movies: undefined,
    genre: undefined,
    count: 0,
    page: 0
  })

  const handleGenreChange = async (genre: string, page: number = 0) => {
    setState({
      ...state,
      loading: true,
      genre,
      page
    });
    const response = await getPopularMovies(page, 6, genre);
    if(response.success) {
      setState({
        ...state,
        loading: false,
        movies: response.data,
        genre,
        page
      });
    }
  }

  const handlePageChange = () => {
    if(state.movies && state.genre) {
      if(state.page < state.movies.totalItems) {
        handleGenreChange(state.genre, state.page+1);
      }
    }
  }

  const handleDoneClick = () => {
    onWizardDone();
  }

  const handleMovieUpdate = (movie: IMovie) => {
    if(state.movies && state.movies.pages) {      
      for (let i = 0; i < state.movies.pages.length; i++) {
        const movieData = state.movies.pages[i];
        if(movieData.id === movie.id) {
          const count = state.count+1;
          const pages = [...state.movies.pages];
          pages[i] = movie;          
          const movies = {...state.movies, pages };
          setState({...state, movies, count });
          break;
        }
      }
    }
  }

  function renderContent() {
    if(state.genre) {
      return (
        <Stack>
          <h3>Rate Movies</h3>
          <p>
            This is a short list of the most popular {state.genre} movies. 
            The Last step for you is to rate at least 5 movies. You rated {state.count} movies
          </p>
          <MoviesList
            hidePagination
            itemCount={6}
            movies={state.movies}
            loading={state.loading}
            onMovieUpdate={handleMovieUpdate}
          />
          <ButtonGrid>
            <GridItem xs={12} sm={6}>
              <Button 
                block
                testid="other-movies-button"
                variant="secondary"
                onClick={handlePageChange}                
              >
              Other Movies
            </Button>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Button
                block
                testid="done-button"
                variant="primary"
                onClick={handleDoneClick}
                disabled={state.count < minRatings}
                >Done</Button>
            </GridItem>
          </ButtonGrid>
        </Stack>
      );
    }

    return (
      <Stack>
        <h3>Wait a minute!</h3>
        <p>
          <i>WhatMovie?</i> is a recommender system based on collaborative filtering.
          Before giving you movies recommandations, we need to know your preferencies.
        </p>
        <p>
          First, Select the genre you like the most:
        </p>
        <GenresPanel onClick={handleGenreChange}/> 
      </Stack>
    )
  }

  return (
    <NewUserWizardStyle
      data-expanded={typeof state.genre !== 'undefined'}
      variant="secondary">
      {renderContent()}
    </NewUserWizardStyle>
  )
})``;

NewUserWizard.defaultProps = {
  
}

const ButtonGrid = styled(Grid)`
  ${({ theme }: WithThemeProps) => css`
    ${GridItem} {
      margin-bottom: ${theme.gutter}px;
    }
    @media (min-width: ${theme.breakPoints.lg}px) {
      max-width: 50%;
      margin: 0 auto;
    }
  `}
`;

const NewUserWizardStyle = styled(Card)`
  ${({ theme }: WithThemeProps) => css`
    &[data-expanded="true"]{
      min-width: 100%;
    }

    @media (max-width: ${theme.breakPoints.md-1}px) {
      &[data-variant]{
        background-color: transparent;
      }      
      padding: 0;
    }
  `}
`;