import React, { useContext, useEffect, useState } from "react"
import PrivateRoute from "../components/privateRoute";
import { Container } from "../components/container";
import MoviesList from "../components/moviesList";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { getRecommendations } from "../services/recommendations";
import { IPagingData } from "../domain/IPagingData";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
}

const Recommended = () => { 

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
    const response = await getRecommendations(currentPage);
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
  }, [isInitializing, currentPage]);

  function getText(): string | undefined {

    if(typeof state.movies === 'undefined' || typeof state.movies.pages  === 'undefined') {
      return undefined;
    }

    return `${state.movies.totalItems} recommended movies found`
  }
  
  return (
    <PrivateRoute>
      <Container fluid>
        <h3>Recommended movies</h3>
        <MoviesList 
          movies={state.movies}
          loading={state.loading}
          text={getText()}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={setCurrentPage}
        />
      </Container>      
    </PrivateRoute>
  );
}

export default Recommended
