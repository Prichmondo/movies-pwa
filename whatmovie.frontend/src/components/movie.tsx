import React, { useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { WithThemeProps, Color, Theme } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { RatingStars } from './ratingStars';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { WatchListAdd } from '../icons/watchListAdd';
import { WatchList } from '../icons/watchList';
import { addToWatchList, removeToWatchList } from '../services/watchlist';
import { IResponse } from '../domain/IResponse';
import { Spinner } from './spinner';

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

  const handleRatingChange = (movieId: number, value: number) => {    
    // ...
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
        <GridItem xs={9} valign="middle">
          <Typography block ellipsis margin="0 0 5px 0" textColor="tertiary">
            <b>{movie.title}</b>
          </Typography>
        </GridItem>
        <GridItem xs={3} valign="middle" align="right">
          <WatchListButton onClick={handleWatchListClick}>
            {getWatchListAction()}
          </WatchListButton>
        </GridItem>
      </Grid>      
      <Typography block>{movie.vote} TMDb score</Typography>
      <Grid>
        <GridItem xs={6} valign="middle">
          <Typography block>users rating</Typography>
        </GridItem>
        <GridItem xs={6} valign="middle">
          <RatingStars rating={movie.avgRating} />
        </GridItem>
      </Grid>
      </MovieInfo>
    </MovieStyle>
  );
}

const WatchListButton = styled.div`
  ${({ theme }: WithThemeProps) => css`
    cursor: pointer;
    height: 28px;
  `}
`;

const MovieInfo = styled.div`
  ${({ theme }: WithThemeProps) => css`
    padding: 10px;
  `}
`;

const MovieStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: block;
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