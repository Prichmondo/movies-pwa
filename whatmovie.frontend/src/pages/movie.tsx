import React, { useEffect, useContext, useState, ReactNode } from "react"
import { getMovie, searchMovies } from "../services/movieService";
import { getMovieDetails, getMovieImages, getMovieCredits } from "../services/tmdbService";
import { addToWatchList, removeToWatchList } from "../services/watchlist";
import { putRating } from "../services/rating";
import { PutEvent } from "../services/eventTracker";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Container } from "../components/container";
import styled, { css } from "styled-components";
import { IMovieDetail } from "../domain/tmdb/IMovieDetail";
import { PageProps } from "gatsby";
import { getQuerystringParams } from "../utils";
import { SpinnerPanel } from "../components/spinnerPanel";
import { IMovieImage } from "../domain/tmdb/IMovieImage";
import { WithThemeProps } from "../types/theme";
import Image from 'gatsby-image';
import { Typography } from "../components/typography";
import { Carousel } from "../components/carousel";
import { ICastMember } from "../domain/tmdb/ICastMember";
import { CastMember } from "../components/castMember";
import { IResponse } from "../domain/IResponse";

import MovieDetail from "../components/movieDetail";
import { CastMemberSkeleton } from "../components/skeletons/castMemberSkeleton";
import { MovieSkeleton } from "../components/skeletons/movie";
import { Movie } from "../components/movie";

type State = {
  loading: boolean;
  movie: IMovie | undefined;
  details: IMovieDetail | undefined;
  cast: ICastMember[] | undefined; 
  movies: IMovie[] | undefined; 
  backgroundImage: IMovieImage | undefined;
  watchlistLoading: boolean;
  ratingLoading: boolean;
}

type PageParams = {
  movieId: string;
}

const MoviePage = ({ location }: PageProps) => { 
  
  const initialState = {
    loading: true,
    movie: undefined,
    details: undefined,
    backgroundImage: undefined,
    cast: undefined,
    movies: undefined,
    watchlistLoading: false,
    ratingLoading: false
  };

  const params = getQuerystringParams<PageParams>(location.search);
  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>(initialState);
  let movieId = params ? parseInt(params.movieId) : null;

  const getBackdropImage = (backdrops: IMovieImage[] | undefined): IMovieImage | undefined => {
    if(!backdrops || backdrops.length === 0) {
      return undefined;
    }
    return backdrops[0];    
  }

  const loadMovie = async (movieId: number) => {
    setState({
      ...state,
      loading: true
    });
    const movieResponse = await getMovie(movieId);
    if(movieResponse.success && movieResponse.data) {
      const movie = movieResponse.data;
      const detailResponse = await getMovieDetails(movie.tmdbid);
      const imagesResponse = await getMovieImages(movie.tmdbid);
      const creditsResponse = await getMovieCredits(movie.tmdbid);
      const similarMoviesResponse = await searchMovies(
        `"${movie.director}" ${movie.cast.split('|').map(c => `"${c}"`).join(' ')} ${movie.genres.split('|').map(c => `"${c}"`).join(' ')}`
        // ,movie.genres.replaceAll('|', ',')
      );

      let cast: ICastMember[] | undefined = undefined;
      if(creditsResponse.success && creditsResponse.data) {
        cast = creditsResponse.data.cast;
      }

      let movies: IMovie[] | undefined = undefined;
      if(similarMoviesResponse.success && similarMoviesResponse.data) {
        movies = similarMoviesResponse.data.pages.filter(m => m.id !== movie.id);
      }

      if(detailResponse.success) {
        setState({
          ...state,
          loading: false,
          movie,
          cast,
          movies,
          details: detailResponse.data,
          backgroundImage: getBackdropImage(imagesResponse.data?.backdrops)
        });
      }
      
    }
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin && movieId) {
      if(typeof state.movie !== 'undefined') {
        console.log('RESET STATE');
        setState(initialState);
      }
      loadMovie(movieId); 
    }
  }, [isInitializing, movieId]);

  const getBackgroudImageUrl = (): string => {
    if(!state.details) {
      return '';
    }
    const { backdrop_path } = state.details;
    return `//image.tmdb.org/t/p/w1000_and_h450_face/${backdrop_path}`
  }

  const renderCast = (): ReactNode[] => {

    if(state.loading) {
      return [1,2,3,4,5,6,7,8,9,10].map(n => <CastMemberSkeleton key={n} />)
    }

    if(typeof state.cast !== 'undefined') {
      return state.cast
        .filter(c => c.profile_path !== null)
        .slice(0, 20)
        .map((castMember => <CastMember key={castMember.id} castMember={castMember} />))
    }
    return [];
  }

  const renderSimilarMovies = (): ReactNode[] => {

    if(state.loading) {
      return [1,2,3,4,5,6,7,8,9,10].map(n => <MovieSkeleton key={n} />)
    }

    if(typeof state.movies !== 'undefined') {
      return state.movies
      .slice(0, 20)
      .map((movie => <Movie key={movie.id} movie={movie} onUpdate={handleMovieUpdate} />))
      
    }
    return [];
  }

  const handleMovieUpdate = (movie: IMovie) => {
    if(state.movies && state.movies) {      
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

  const handleWatchListClick = async () => {
    if(state.movie) {
      let response: IResponse<any>;
      const value = !state.movie.watchlist;
      setState({...state, watchlistLoading: true });
      if(value) {
        response = await addToWatchList(state.movie.id);
      } else {
        response = await removeToWatchList(state.movie.id);      
      }
      setState({...state, watchlistLoading: false });
      if(response.success) {
        const movie = {
          ...state.movie,
          watchlist: value
        }
        setState({...state, movie});
      }
    }    
  }

  const handleRatingChange = async (userRating: number) => {    
    if(state.movie) {
      setState({...state, ratingLoading: true });
      const response = await putRating(state.movie.id, userRating, state.movie.genres);
      setState({...state, ratingLoading: false });
      if(response.success) {
        PutEvent('RATING', `${state.movie.id}`, userRating);
        const movie = {
          ...state.movie,
          userRating
        }
        setState({...state, movie});
      }
    }    
  }

  return (
    <PrivateRoute>
      <SpinnerPanel show={state.loading}/>
      <MovieTop>
        <MovieBackgroud>
          <Image
            fluid={{
              src: getBackgroudImageUrl(),
              srcSet: getBackgroudImageUrl(),
              aspectRatio: 1000/450,
              sizes: ''
            }}
          />
        </MovieBackgroud>
        <MovieDetailWrapper>
          <MovieDetail 
            loading={state.loading}
            movie={state.movie}
            details={state.details}
            watchlistLoading={state.watchlistLoading}
            ratingLoading={state.ratingLoading}
            onWatchListChange={handleWatchListClick}
            onRatingChange={handleRatingChange}
          />
        </MovieDetailWrapper>
      </MovieTop>
      <CastSection>
        <Container>
          <Typography component="h3">Movie Cast</Typography>
        </Container>
        <CarouselContainer>
          <Carousel loading={false}>
            {renderCast()}
          </Carousel>
        </CarouselContainer>   
        <Container>
          <Typography component="h3">More Like this</Typography>
        </Container>
        <CarouselContainer>
          <Carousel loading={false}>
            {renderSimilarMovies()}
          </Carousel>
        </CarouselContainer>                
      </CastSection>   
    </PrivateRoute>
  );
}



const CastSection = styled.section`
  ${({ theme }: WithThemeProps) => css`
    padding: 30px 0;
    background-color: ${theme.palette.secondary.darker};
  `}
`

const CarouselContainer = styled(Container)`
  ${({ theme }: WithThemeProps) => css`
    
    padding: 20px 0;
    
    @media (min-width: ${theme.breakPoints.md}px) {
      padding-top: 20px 0;
    }
  `}
`

const MovieBackgroud = styled.div`
  ${({ theme }: WithThemeProps) => {
    return css`
      position: relative;
      width: 100%;
      height: 100%;

      & > * {
        height: 100%;
      }

      img {
        max-width: 100%;
      }
      
      @media (min-width: ${theme.breakPoints.md}px) {
        position: absolute;
        z-index: -1;

        &:after {
          content: '';
          position: absolute;
          background: linear-gradient(0deg, rgba(0,15,27,0.8) 50%, rgba(0,15,27,1) 100%);
          z-index: 1;
          right: 0;
          top:0;
          left:0;
          bottom:0;
        }
      }
    `
  }}
`

const MovieTop = styled.section`
  position: relative;
`

const MovieDetailWrapper = styled.div`
  ${({ theme }: WithThemeProps) => {
    return css`
      position: relative;
      
      @media (min-width: ${theme.breakPoints.md}px) {
        z-index: 0;
      }
    `
  }}
`

export default MoviePage
