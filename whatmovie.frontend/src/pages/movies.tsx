import React, { useEffect, useContext, useState } from "react"
import { PageProps } from "gatsby"
import { searchMovies } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Movie } from "../components/movie";
import { Input } from "../components/input";
import { Stack } from "../components/stack";
import { Container } from "../components/container";
import { Grid } from "../components/grid";
import { GridItem } from "../components/gridItem";
import { Typography } from "../components/typography";

type State = {
  loading: boolean;
  movies: IMovie[];
}

const Movies = (props: PageProps) => { 

  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,
    movies: []
  })

  const search = async () => {
    const response = await searchMovies('');
    if(response.success) {
      setState({
        loading: true,
        movies: response.data ? response.data.pages : []
      })
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
          <h2>Search results 22</h2>
          <Grid>
            {state.movies.map(movie => (
              <GridItem xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <Movie movie={movie} />
              </GridItem>
            ))}
          </Grid>
      </Container>      
    </PrivateRoute>
  );
}

export default Movies
