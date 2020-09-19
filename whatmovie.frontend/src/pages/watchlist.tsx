import React, { useEffect, useContext, useState } from "react"
import { getWatchList } from "../services/watchlist";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Container } from "../components/container";
import { IPagingData } from "../domain/IPagingData";
import MoviesList from "../components/moviesList";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
}

const Watchlist = () => { 

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
    const response = await getWatchList(currentPage);
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

          if(!movie.watchlist) {
            pages.splice(i, 1);
          } else {
            pages[i] = movie;
          }
          
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
          movies={state.movies}
          loading={state.loading}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={setCurrentPage}
        />
      </Container>      
    </PrivateRoute>
  );
}

export default Watchlist
