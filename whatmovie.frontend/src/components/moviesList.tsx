import React from "react"
import { IMovie } from "../domain/IMovie";
import { Movie } from "../components/movie";
import { Grid } from "../components/grid";
import { GridItem } from "../components/gridItem";
import Pagination from "../components/pagination";
import { IPagingData } from "../domain/IPagingData";
import styled, { css } from "styled-components";
import { WithThemeProps } from "../types/theme";
import { SpinnerPanel } from "../components/spinnerPanel";
import { hasValue } from "../utils";

type Props = {
  movies: IPagingData<IMovie> | undefined;
  loading?: boolean;
  text?: string;
  onPageChange?: (page: number) => void;
  onMovieUpdate?: (movie: IMovie) => void;
}

const MoviesList = ({ movies, loading, text, onPageChange, onMovieUpdate }: Props) => { 

  function handlePageChange(page: number) {
    if(onPageChange) {
      onPageChange(page);
    }
  }

  function handleMovieUpdate(movie: IMovie) {
    if(onMovieUpdate) {
      onMovieUpdate(movie);
    }
  }
  
  function getPagination() {

    if(
      typeof movies === 'undefined' || 
      typeof movies.pages  === 'undefined' ||
      movies.totalPages === 1 && !hasValue(text)
    ) {
      return null;
    }

    return(
      <PaginationGrid>
        <GridItem xs={12} sm={6} valign="middle">
          <ResultDescription>
            {text}
          </ResultDescription>
        </GridItem>
        <GridItem xs={12} sm={6} valign="middle">
          <Pagination 
            current={movies.currentPage+1} 
            total={movies.totalPages} 
            onClick={(p) => handlePageChange(p-1)} 
            />
        </GridItem>
      </PaginationGrid>
    )
  }

  function getMoviesList() {

    if(typeof movies === 'undefined' || typeof movies.pages  === 'undefined') {
      return null;
    }

    return (
      <Grid>
        {movies.pages.map(movie => (
          <GridItem xs={6} sm={4} md={3} lg={3} xl={2} key={movie.id}>
            <Movie onUpdate={handleMovieUpdate} movie={movie} />
          </GridItem>
        ))}
      </Grid>
    );
  }

  return (
    <MoviesContainer>
      <SpinnerPanel show={loading || false} />
      {getPagination()}
      {getMoviesList()}
      {getPagination()}
    </MoviesContainer>
  );
}

const MoviesContainer = styled.div`
  min-height: 200px;
  position: relative;
`

const PaginationGrid = styled(Grid)`
  ${({theme}: WithThemeProps) => {
    return css`
      
      ${GridItem} {
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
      }

      @media (min-width: ${theme.breakPoints.sm}px){

        height: 120px;

        ${GridItem} {
          padding-bottom: 0;
          justify-content: flex-start;
        }

        ${GridItem}:last-child {
          justify-content: flex-end;
        }

      }
    `
  }}
`

const ResultDescription = styled.span`
  ${({theme}: WithThemeProps) => {
    return css`
      color: ${theme.palette.tertiary.lighter};
      font-size: ${theme.typography.size.h4};

      @media (min-width: ${theme.breakPoints.md}px) {
        font-size: ${theme.typography.size.h3};
      }

    `
  }}
`

export default MoviesList;
