import React, { useEffect, useContext, useState } from "react"
import { searchMovies } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Container } from "../components/container";
import { MovieSearchContext } from "../context/movieSearchContext";
import { IPagingData } from "../domain/IPagingData";
import MoviesList from "../components/moviesList";
import styled from "styled-components";

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

  const handleMovieUpdate = (movie: IMovie) => {
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

  function getText(): string | undefined {

    if(typeof state.movies === 'undefined' || typeof state.movies.pages  === 'undefined') {
      return undefined;
    }

    return `${state.movies.totalItems} results found for "${searchTerm}"`
  }

  return (
    <PrivateRoute>
      <Container fluid>
        <MoviesList 
          movies={state.movies}
          topText={<PaginationText>{getText()}</PaginationText>}
          loading={state.loading}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={setCurrentPage}
        />
      </Container>      
    </PrivateRoute>
  );
}

const PaginationText = styled.h4`
  margin-bottom: 0;
`

export default Movies
