import React, { useEffect, useContext, useState } from "react"
import { getRated } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Container } from "../components/container";
import { IPagingData } from "../domain/IPagingData";
import MoviesList from "../components/moviesList";
import { Headline } from "../components/headline";
import { Typography } from "../components/typography";

type State = {
  loading: boolean;
  movies: IPagingData<IMovie> | undefined;
  currentPage: number;
}

const MyList = () => { 

  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,  
    movies: undefined,
    currentPage: 0,
  })

  const loadData = async (page: number) => {
    setState({
      ...state,
      loading: true
    });
    const response = await getRated(page);
    if(response.success) {
      setState({
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
    loadData(page);
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      loadData(0); 
    }
  }, [isInitializing]);
  
  return (
    <PrivateRoute>
      <Container>        
        <MoviesList
          topText={<Typography component="h2">Rated Movies</Typography>}
          movies={state.movies}
          loading={state.loading}
          onMovieUpdate={handleMovieUpdate}
          onPageChange={handleCurrentPage}
        />
      </Container>      
    </PrivateRoute>
  );
}

export default MyList
