import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { addToWatchList, removeToWatchList } from '../services/watchlist';
import { putRating } from '../services/rating';
import { IResponse } from '../domain/IResponse';
import { PutEvent } from '../services/eventTracker';
import { navigate } from 'gatsby';
import { WatchListButton } from './watchListButton';
import { SmallRatings } from './smallRatings';

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
    setState({...state, ratingLoading: true });
    const response = await putRating(movie.id, userRating, movie.genres);
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
        <MovieTitle 
          onClick={handleMovieClick} 
          textColor="tertiary" 
          textSize="sm">
          <b>{movie.title}</b>
        </MovieTitle>
        <MovieGrid>
          <GridItem xs={8} valign="middle" align="left">
            <SmallRatings 
              movie={movie}
              onChange={handleRatingChange}
              /> 
          </GridItem>
          <GridItem xs={4} valign="middle" align="right">
            <WatchListButton 
              loading={state.watchlistLoading}
              inWatchlist={movie.watchlist}
              onClick={handleWatchListClick} 
              />
          </GridItem>
        </MovieGrid>
               
      </MovieInfo>
    </MovieStyle>
  );
}

const MovieTitle = styled(Typography)`
  ${({ theme }: WithThemeProps) => css`
    display: none;
    @media (min-width: ${theme.breakPoints.sm}px){
      display: flex;
      flex-grow: 1;    
      margin-bottom: 5px;
      height: 100%;
    }
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