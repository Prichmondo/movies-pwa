import React from "react"
import PrivateRoute from "../components/privateRoute";
import { IMovie } from "../domain/IMovie";
import { getPopularMovies, getReccomendedMovies } from "../services/movieService";
import { Container } from "../components/container";
import { MovieCarouselContainer } from "../containers/movieCarouselContainer";

const Browse = () => { 

  async function getTopMovies(): Promise<IMovie[]> {    
    const response = await getPopularMovies(0, 20);
    if(response.success && response.data) {
      return response.data.pages;
    }
    return []
  }

  async function getRecommendedMovies(): Promise<IMovie[]> {    
    const response = await getReccomendedMovies(0, 20);
    if(response.success && response.data) {
      return response.data.pages;
    }
    return []
  }

  return (
    <PrivateRoute>

      <Container fluid>
        <h3 style={{ margin: '20px 5px'}}>
          Top Movies
        </h3>
      </Container>
      
      <MovieCarouselContainer
        getMovies={getTopMovies}
      /> 

      <Container fluid>
        <h3 style={{ margin: '20px 5px'}}>
          Recommended Movies
        </h3>
      </Container>
      
      <MovieCarouselContainer
        getMovies={getRecommendedMovies}
      />  
    </PrivateRoute>
  );
}

export default Browse
