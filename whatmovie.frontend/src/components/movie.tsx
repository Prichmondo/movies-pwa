import React from 'react';
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

interface Props {
    movie: IMovie;
    className?: string;
};

export const Movie = ({ movie, className }: Props) => {
  
  const theme = useTheme() as Theme;

  const watchListAction = movie.watchList 
    ? <WatchList fill={theme.palette.tertiary.main} />
    : <WatchListAdd fill={theme.palette.secondary.lighter} />

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
        <GridItem xs={3} valign="middle">
          {watchListAction}
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