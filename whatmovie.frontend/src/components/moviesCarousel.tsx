import React, { useContext, useEffect, useReducer, useRef, useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { IMovie } from "../domain/IMovie"
import { IPagingData } from "../domain/IPagingData"
import { ChevronLeft } from "../icons/chevronLeft"
import { ChevronRight } from "../icons/chevronRight"
import { Theme, WithThemeProps } from "../types/theme"
import { Movie } from "./movie"

type Props = {
  movies: IPagingData<IMovie> | undefined;
  page: number;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onMovieUpdate?: (movie: IMovie) => void;
}

const CAROUSEL_MARGIN = 4;
const CAROUSEL_WIDTH = 100-CAROUSEL_MARGIN*2;

export function MoviesCarousel({ movies, loading, page, onMovieUpdate, onPageChange }: Props) {

  const carousel = useRef<HTMLDivElement>(null);

  if(loading) {
    return <div>
      loading...
    </div>
  }

  function handleMovieUpdate(movie: IMovie) {
    if(onMovieUpdate) {
      onMovieUpdate(movie);
    }
  }

  function handlePageChange(page: number) {
    if(carousel.current) {
      carousel.current.scrollBy({ left: page*carousel.current.offsetWidth/100*CAROUSEL_WIDTH, top: 0 })
    }
  }

  function getMoviesList() {

    if(typeof movies === 'undefined' || typeof movies.pages  === 'undefined') {
      return null;
    }

    return (
      <MoviesCarouselGrid>
        <MoviesCarouselMargin />
        {movies.pages.map(movie => (
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
      flex: 0 0 ${CAROUSEL_WIDTH/2}%;
      padding-right: ${theme.gutter/2}px;
      padding-left: ${theme.gutter/2}px;

      @media (min-width: ${theme.breakPoints.sm}px) {
        flex-basis: ${CAROUSEL_WIDTH/3}%;
      }

      @media (min-width: ${theme.breakPoints.md}px) {
        flex-basis: ${CAROUSEL_WIDTH/4}%;
      }

      @media (min-width: ${theme.breakPoints.lg}px) {
        flex-basis: ${CAROUSEL_WIDTH/6}%;
      }

      @media (min-width: ${theme.breakPoints.xl}px) {
        flex-basis: ${CAROUSEL_WIDTH/8}%;
      }
    `
  }}
`

const MoviesCarouselMargin = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex: 0 0 ${CAROUSEL_MARGIN}%;
      padding-right: ${theme.gutter/2}px;
      padding-left: ${theme.gutter/2}px;
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

      &:after, &:before {
        content: '';
        width: ${CAROUSEL_MARGIN}%;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
      }

      &:before {
        left: 0;
        background-image: linear-gradient(-90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
      }

      &:after {
        right: 0;
        background-image: linear-gradient(90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
      }
    `
  }}
`