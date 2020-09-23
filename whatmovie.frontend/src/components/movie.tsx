import React, { useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { WithThemeProps, Theme } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { WatchListAdd } from '../icons/watchListAdd';
import { WatchList } from '../icons/watchList';
import { addToWatchList, removeToWatchList } from '../services/watchlist';
import { addRating, updateRating } from '../services/rating';
import { IResponse } from '../domain/IResponse';
import { Spinner } from './spinner';
import { Ratings } from './ratings';
import { PutEvent } from '../services/eventTracker';
import { navigate } from 'gatsby';
import { WatchListButton } from './watchListButton';

interface Props {
  movie: IMovie;
  className?: string;
  onUpdate?: (movie: IMovie) => void
};

interface State {
  watchlistLoading: boolean;
  ratingLoading: boolean;
};

export const Movie = ({ movie, className, onUpdate }: Props) => {

  const theme = useTheme() as Theme;
  const [state, setState] = useState<State>({
    watchlistLoading: false,
    ratingLoading: false
  });
 
  const handleWatchListClick = async () => {
    let response: IResponse<any>;
    const value = !movie.watchlist;
    setState({...state, watchlistLoading: true });
    if(value) {
      response = await addToWatchList(movie.id);
    } else {
      response = await removeToWatchList(movie.id);      
    }
    setState({...state, watchlistLoading: false });
    if(response.success && onUpdate) {
      onUpdate({...movie, watchlist: value});
    }
  }

  const handleRatingChange = async (userRating: number) => {    
    let response: IResponse<any>;

    setState({...state, ratingLoading: true });
    if(!movie.userRating) {
      response = await addRating(movie.id, userRating);
    } else {
      response = await updateRating(movie.id, userRating);      
    }
    setState({...state, ratingLoading: false });
    if(response.success && onUpdate) {
      PutEvent('RATING', `${movie.id}`, userRating);
      onUpdate({...movie, userRating});
    }
  }

  const handleMovieClick = () => {
    navigate(`/movie?movieId=${movie.id}`)
  }

  return (
    <MovieStyle className={className}>
      <ImageWrapper 
        onClick={handleMovieClick}>
        <Image
          fluid={{
            aspectRatio: 150/225,
            src: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
            srcSet: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
            sizes: ''          
          }}
        />
      </ImageWrapper>
      <MovieInfo>
        <Grid>
          <GridItem xs={9} valign="top">
            <Typography onClick={handleMovieClick} block textColor="tertiary" textSize="sm">
              <b>{movie.title}</b>
            </Typography>
          </GridItem>
          <GridItem xs={3} valign="top" align="right">
            <WatchListButton 
              loading={state.watchlistLoading}
              inWatchlist={movie.watchlist}
              onClick={handleWatchListClick} 
              />
          </GridItem>
        </Grid>
        <Ratings 
          movie={movie}
          onChange={handleRatingChange}
          />        
      </MovieInfo>
    </MovieStyle>
  );
}

const ImageWrapper = styled.div`
  cursor: pointer;
`;

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
    padding: 2px;
    width: 100%;
    background-color: ${theme.palette.secondary.main};
    margin-bottom: ${theme.gutter}px;
    transition: border .4s ease;
    border: 2px solid transparent;

    &:hover {
      border: 2px solid ${theme.palette.primary.lighter};
      box-shadow: 0px 0px 57px 16px rgba(0,15,27,0.47);
    }
  `}
`;