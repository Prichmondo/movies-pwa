import React, { Fragment, ReactNode, useEffect, useState } from "react"
import PrivateRoute from "../components/privateRoute";
import { IMovie } from "../domain/IMovie";
import { getPopularMovies, getReccomendedMovies, getRated } from "../services/movieService";
import { MovieCarouselContainer } from "../containers/movieCarouselContainer";
import { Container } from "../components/container";
import { SpinnerPanel } from "../components/spinnerPanel";
import { NewUserWizard } from "../components/newUserWizard";

type State = {
  loading: boolean;
  hasRatings: boolean;
}

const Browse = () => { 

  const [state, setState] = useState<State>({
    loading: true,
    hasRatings: false
  });

  useEffect(() => {
    getRatings()
  }, []);

  async function getRatings() {    
    const response = await getRated(0, 20);
    if(
      response.success && 
      response.data && 
      response.data.pages.length > 0
    ) {
      setState({
        loading: false,
        hasRatings: true
      });
    } else {
      setState({
        loading: false,
        hasRatings: false
      });
    }
  }

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

  function handleWizardDone() {
    getRatings();
  }

  function renderContent(): ReactNode {
    
    if(state.loading) {
      return (
        <Container>
          <SpinnerPanel show={state.loading || false} />
        </Container>
      );
    }
  
    if(!state.hasRatings) {
      return (
        <Container>
          <NewUserWizard onWizardDone={handleWizardDone}/>
        </Container>
      );
    }

    return (
      <Fragment>
        <MovieCarouselContainer
          title="Recommended Movies"
          getMovies={getRecommendedMovies}
        />

        <MovieCarouselContainer
          title="Popular Movies"
          getMovies={getTopMovies}
        />
      </Fragment>
    );
  }

  return (
    <PrivateRoute>      
      {renderContent()}        
    </PrivateRoute>
  );
}

export default Browse
