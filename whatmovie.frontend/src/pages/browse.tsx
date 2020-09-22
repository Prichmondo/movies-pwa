import React, { useContext, useEffect, useState } from "react"
import PrivateRoute from "../components/privateRoute";
import { Container } from "../components/container";
import MoviesList from "../components/moviesList";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { getPopularMovies } from "../services/movieService";
import { IPagingData } from "../domain/IPagingData";
import { Headline } from "../components/headline";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
}

const Browse = () => { 

  const [currentPage, setCurrentPage] = useState(0);
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
    const response = await getPopularMovies(currentPage);
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

  
  return (
    <PrivateRoute>
      <Container fluid>        
        <MoviesList
          topText={<Headline>Most Popular</Headline>}
          movies={state.movies}
          loading={state.loading}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={setCurrentPage}
        />
      </Container>      
    </PrivateRoute>
  );
}

export default Browse
