import React, { ReactNode } from "react"
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
import { MovieSkeleton } from "./skeletons/movie";

type Props = {
  movies: IPagingData<IMovie> | undefined;
  loading?: boolean;
  topText?: string | ReactNode;
  bottomText?: string | ReactNode;
  onPageChange?: (page: number) => void;
  onMovieUpdate?: (movie: IMovie) => void;
}

const MoviesList = ({ movies, loading, topText, bottomText, onPageChange, onMovieUpdate }: Props) => { 

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
  
  function getPagination(text: string | ReactNode) {

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
          {text}
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
      return (
        <Grid>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(mock => (
            <GridItem xs={6} sm={4} md={3} lg={3} xl={2} key={mock}>
              <MovieSkeleton />
            </GridItem>
          ))}
        </Grid>
      );
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
      {getPagination(topText)}
      {getMoviesList()}
      {getPagination(bottomText)}
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

export default MoviesList;
