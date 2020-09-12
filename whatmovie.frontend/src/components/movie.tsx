import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps, Color } from '../types/theme';
import { Spinner } from './spinner';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';

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
    </MovieStyle>
  );
}

const MovieStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: block;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    background-color: rgb(255,255,255,1);
    border: 2px solid rgb(255,255,255,1);
    margin-bottom: ${theme.gutter}px;
  `}
`;