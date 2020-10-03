import React, { useContext, useEffect, useState } from "react"
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { getPopularMovies, getReccomendedMovies } from "../services/movieService";
import { IPagingData } from "../domain/IPagingData";
import { MoviesCarousel } from "../components/moviesCarousel";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
  currentPage: number;
}

const Browse = () => { 

  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,  
    movies: undefined,
    currentPage: 0
  })

  const loadData = async (page: number) => {
    setState({
      ...state,
      loading: true
    });
    const response = await getPopularMovies(page);
    if(response.success) {
      setState({
        ...state,
        loading: false,
        movies: response.data,
        currentPage: page
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

  const handleCurrentPage = (page: number) => {
    setState({ ...state, currentPage: page })
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      loadData(0); 
    }
  }, [isInitializing]);

  return (
    <PrivateRoute>
      <MoviesCarousel
          movies={state.movies}
          loading={state.loading}
          page={state.currentPage}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={handleCurrentPage}
        />  
    </PrivateRoute>
  );
}

export default Browse
