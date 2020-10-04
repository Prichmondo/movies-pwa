import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { MoviesCarousel } from "../components/moviesCarousel";

type Props = {
  getMovies: () => Promise<IMovie[]>;
}

type State = {
  loading: boolean;
  movies: IMovie[] | undefined;
}

export const MovieCarouselContainer = ({ getMovies }: Props) => { 

  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,  
    movies: undefined
  })

  const loadData = async () => {
    setState({
      ...state,
      loading: true
    });
    const movies = await getMovies();
    setState({
      ...state,
      loading: false,
      movies
    });
  }

  const handleMovieUpdate = (movie: IMovie) => {
    if(state.movies) {      
      for (let i = 0; i < state.movies.length; i++) {
        const movieData = state.movies[i];
        if(movieData.id === movie.id) {
          const movies = [...state.movies];
          movies[i] = movie;          
          setState({...state, movies });
          break;
        }
      }
    }
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      loadData(); 
    }
  }, [isInitializing]);

  return (
    <MoviesCarousel
      movies={state.movies}
      loading={state.loading}
      onMovieUpdate={handleMovieUpdate}
    /> 
  );
}
