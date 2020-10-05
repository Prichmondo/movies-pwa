import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Carousel } from "../components/carousel";
import { MovieSkeleton } from "../components/skeletons/movie";
import { Movie } from "../components/movie";

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

  const getMoviesList = () => {
    if(typeof state.movies === 'undefined' && state.loading) {
      return [1,2,3,4,5,6,7,8,9,10].map(mock => (
        <MovieSkeleton key={mock} />
      ));
    }

    if(typeof state.movies === 'undefined') {
      return [];
    }

    return state.movies.map(movie => (
      <Movie key={movie.id} onUpdate={handleMovieUpdate} movie={movie} />
    ));
  }

  return (
    <Carousel loading={state.loading}>
      {getMoviesList()}
    </Carousel> 
  );
}
