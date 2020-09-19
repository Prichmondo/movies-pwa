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
      onUpdate({...movie, userRating});
    }
  }

  const getWatchListAction = () => {

    if(state.watchlistLoading) {
      return <Spinner variant="secondary" width={20} borderSize={3} />
    }

    return movie.watchlist 
    ? <WatchList fill={theme.palette.tertiary.main} />
    : <WatchListAdd fill={theme.palette.secondary.lighter} />
  }

  return (
    <MovieStyle className={className}>
      <Image 
        fluid={{
          aspectRatio: 150/225,
          src: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
          srcSet: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
          sizes: ''          
        }}
      />
      <MovieInfo>
        <Grid>
          <GridItem xs={9} valign="top">
            <Typography block textColor="tertiary" textSize="sm">
              <b>{movie.title}</b>
            </Typography>
          </GridItem>
          <GridItem xs={3} valign="top" align="right">
            <WatchListButton onClick={handleWatchListClick}>
              {getWatchListAction()}
            </WatchListButton>
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

const WatchListButton = styled.div`
  cursor: pointer;
  height: 24px;
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
  `}
`;