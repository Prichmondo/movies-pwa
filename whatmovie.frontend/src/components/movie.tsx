import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps, Color } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';

interface Props {
    movie: IMovie;
    className?: string;
};

export const Movie = ({ movie, className }: Props) => {
  return (
    <MovieStyle>
      <Image 
        fluid={{
          aspectRatio: 150/225,
          src: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
          srcSet: `//image.tmdb.org/t/p/w220_and_h330_face/${movie.img}`,
          sizes: ''          
        }}
      />
      <MovieInfo>
      <Typography ellipsis margin="0 0 5px 0" block textColor="tertiary"><b>{movie.title}</b></Typography>
      <Typography block>{movie.vote} TMDb score</Typography>
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