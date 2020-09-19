import React, { useEffect, useContext, useState } from "react"
import { searchMovies } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Movie } from "../components/movie";
import { Container } from "../components/container";
import { Grid } from "../components/grid";
import { GridItem } from "../components/gridItem";
import { MovieSearchContext } from "../context/movieSearchContext";
import Pagination from "../components/pagination";
import { IPagingData } from "../domain/IPagingData";
import styled, { css } from "styled-components";
import { WithThemeProps } from "../types/theme";
import { Spinner } from "../components/spinner";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
}

const Movies = () => { 

  const { searchTerm, genre, currentPage, itemsPerPage, setCurrentPage } = useContext(MovieSearchContext);
  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,
    movies: undefined
  })

  const search = async () => {
    setState({
      ...state,
      loading: true
    });
    const response = await searchMovies(searchTerm, genre, currentPage, itemsPerPage);
    if(response.success) {
      setState({
        loading: false,
        movies: response.data
      });
    }
  }

  const updateClient = (movie: IMovie) => {
    if(state.movies && state.movies.pages) {      
      for (let i = 0; i < state.movies.pages.length; i++) {
        const movieData = state.movies.pages[i];
        if(movieData.id === movie.id) {
          const pages = [...state.movies.pages];
          pages[i] = movie;
          const movies = {...state.movies, pages };
          setState({...state, movies });
          break;
        }
      }
    }
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      search(); 
    }
  }, [isInitializing]);

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      search();
    }
  }, [searchTerm, genre, currentPage, itemsPerPage]);
  
  function getPagination() {

    if(typeof state.movies === 'undefined' || typeof state.movies.pages  === 'undefined') {
      return null;
    }

    return(
      <PaginationGrid>
        <GridItem xs={12} sm={6} valign="middle">
          <ResultDescription>
            {`${state.movies.totalItems} results found for "${searchTerm}"`}
          </ResultDescription>
        </GridItem>
        <GridItem xs={12} sm={6} valign="middle">
          <Pagination 
            current={state.movies.currentPage+1} 
            total={state.movies.totalPages} 
            onClick={(p) => setCurrentPage(p-1)} 
            />
        </GridItem>
      </PaginationGrid>
    )
  }

  function getMovies() {

    if(typeof state.movies === 'undefined' || typeof state.movies.pages  === 'undefined') {
      return null;
    }

    return (
      <MoviesContainer>
        <SpinnerPanel data-visible={state.loading}>
          <MovieSpinner variant="secondary"/>
        </SpinnerPanel>
        {getPagination()}
        <Grid>
          {state.movies.pages.map(movie => (
            <GridItem xs={6} sm={4} md={3} lg={3} xl={2} key={movie.id}>
              <Movie onUpdate={updateClient} movie={movie} />
            </GridItem>
          ))}
        </Grid>
        {getPagination()}
      </MoviesContainer>
    );
  }

  return (
    <PrivateRoute>
      <Container fluid>
        {getMovies()}
      </Container>      
    </PrivateRoute>
  );
}

const MovieSpinner = styled(Spinner)`
  position: fixed;
  opacity: 0.5;
  z-index: 2;
  left: 50%;
  top: 50%;
  margin-top: -30px;
  margin-left: -30px;
`;

const SpinnerPanel = styled.div`
  ${({theme}: WithThemeProps) => {
    return css`

      opacity: 0;
      visibility: hidden;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      &[data-visible="true"] {
        &, ${MovieSpinner} {
          opacity: 1;
          visibility: visible;
        }
      }

      &:after {
        content: '';
        position: absolute;
        display: block;
        background-color: ${theme.palette.secondary.darker};
        opacity: 0.9;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }

    `
  }}  
`

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

export default Movies
