import React, { useContext, useEffect, useReducer, useRef, useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { IMovie } from "../domain/IMovie"
import { IPagingData } from "../domain/IPagingData"
import { ChevronLeft } from "../icons/chevronLeft"
import { ChevronRight } from "../icons/chevronRight"
import { MediaBreakPoints, Theme, WithThemeProps } from "../types/theme"
import { GetBreakPoint } from "../utils/responsive"
import { Movie } from "./movie"
import { MovieSkeleton } from "./skeletons/movie"
import { SpinnerPanel } from "./spinnerPanel"

type Props = {
  movies: IMovie[] | undefined;
  loading?: boolean;
  onMovieUpdate?: (movie: IMovie) => void;
}

const CAROUSEL_MARGINS: {[key in MediaBreakPoints]: number } = {
  xs: 15,
  sm: 15,
  md: 60,
  lg: 60,
  xl: 60
};

export function MoviesCarousel({ movies, loading, onMovieUpdate }: Props) {

  const carousel = useRef<HTMLDivElement>(null);
  const theme = useTheme() as Theme;

  function handleMovieUpdate(movie: IMovie) {
    if(onMovieUpdate) {
      onMovieUpdate(movie);
    }
  }

  function handlePageChange(page: number) {    
    if(carousel.current) {
      const breakpint = GetBreakPoint(theme);
      const margin = CAROUSEL_MARGINS[breakpint];
      carousel.current.scrollBy({ left: page * (carousel.current.offsetWidth - margin*2), top: 0 })
    }
  }

  function getMoviesList() {

    if(typeof movies === 'undefined' ) {
      return (
        <MoviesCarouselGrid>
          <MoviesCarouselMargin />
          {[1,2,3,4,5,6,7,8,9,10].map(mock => (
            <MoviesCarouselGridItem key={mock}>
              <MovieSkeleton />
            </MoviesCarouselGridItem>
          ))}
          <MoviesCarouselMargin />
        </MoviesCarouselGrid>
      );
    }

    return (
      <MoviesCarouselGrid>
        <MoviesCarouselMargin />
        {movies.map(movie => (
          <MoviesCarouselGridItem key={movie.id}>
            <Movie onUpdate={handleMovieUpdate} movie={movie} />
          </MoviesCarouselGridItem>
        ))}
        <MoviesCarouselMargin />
      </MoviesCarouselGrid>
    );
  }

  return (
    <MoviesCarouselStyle>
      <SpinnerPanel show={loading || false} />
      <ChevronLeft
        fill="#fff"
        width={50}
        height={50}
        data-active={true}
        onClick={() => handlePageChange(-1)}
        />
      <MoviesCarouselWrapper ref={carousel}>
        {getMoviesList()}
      </MoviesCarouselWrapper>      
      <ChevronRight
        fill="#fff"
        width={50}
        height={50}
        data-active={true}
        onClick={() => handlePageChange(+1)}
        />
    </MoviesCarouselStyle>
  )
}
const MoviesCarouselGrid = styled.div`
 ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      margin-bottom: 8px;
    `
  }}  
`;

const MoviesCarouselGridItem = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex: 0 0 calc((100% - ${CAROUSEL_MARGINS.xs*2}px) / 2.1);
      padding-right: ${theme.gutter/3}px;
      padding-left: ${theme.gutter/3}px;

      @media (min-width: ${theme.breakPoints.sm}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.sm*2}px) / 3.1);
      }

      @media (min-width: ${theme.breakPoints.md}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.md*2}px) / 4);
      }

      @media (min-width: ${theme.breakPoints.lg}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.lg*2}px) / 6);
      }

      @media (min-width: ${theme.breakPoints.xl}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.xl*2}px) / 8);
      }
    `
  }}
`

const MoviesCarouselMargin = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex: 0 0 ${CAROUSEL_MARGINS.xs}px;
      padding-right: ${theme.gutter/2}px;
      padding-left: ${theme.gutter/2}px;

      @media (min-width: ${theme.breakPoints.sm}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.sm}px
      }

      @media (min-width: ${theme.breakPoints.md}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.md}px
      }

      @media (min-width: ${theme.breakPoints.lg}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.lg}px
      }

      @media (min-width: ${theme.breakPoints.xl}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.xl}px
      }
    `
  }}
`

const MoviesCarouselWrapper = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      overflow: hidden;
      overflow-x: scroll;
      width: 100%;
      margin-bottom: -18px;
      scroll-behavior: smooth;
    `
  }}
`

const MoviesCarouselStyle = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      width: 100%;
      background-color: ${theme.palette.secondary.darker};
      position: relative;
      z-index: 0;
      overflow-y: hidden;

      & > svg {
        display: none;
      }

      &:after, &:before {
        content: '';
        width: ${CAROUSEL_MARGINS.xs}px;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;

        @media (min-width: ${theme.breakPoints.sm}px ){ 
          width: ${CAROUSEL_MARGINS.sm}px
        }

        @media (min-width: ${theme.breakPoints.md}px ){ 
          width: ${CAROUSEL_MARGINS.md}px
        }

        @media (min-width: ${theme.breakPoints.lg}px ){ 
          width: ${CAROUSEL_MARGINS.lg}px
        }

        @media (min-width: ${theme.breakPoints.xl}px ){ 
          width: ${CAROUSEL_MARGINS.xl}px
        }
      }

      &:before {
        left: 0;
        background-image: linear-gradient(-90deg, rgba(0,15,27,0), rgba(0,15,27,1));
      }

      &:after {
        right: 0;
        background-image: linear-gradient(90deg, rgba(0,15,27,0), rgba(0,15,27,1));
      }

      @media (min-width: ${theme.breakPoints.md}px) {
        & > svg {
          display: block;
          cursor: pointer;
          position: absolute;
          z-index: 2;
          top: 50%;
          margin-top: -25px;
        }

        & > svg:first-child {
          left: 0;
        }

        & > svg:last-child {
          right: 0;
        }

        &:before {
          left: 0;
          background-image: linear-gradient(-90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
        }

        &:after {
          right: 0;
          background-image: linear-gradient(90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
        }
      }
    `
  }}
`