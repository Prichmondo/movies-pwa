import React, { useEffect, useContext, useState, Fragment } from "react"
import { getMovie } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";
import { IMovie } from "../domain/IMovie";
import { Container } from "../components/container";
import styled, { css, useTheme } from "styled-components";
import { getMovieDetails, getMovieImages, getMovieCredits } from "../services/tmdbService";
import { IMovieDetail } from "../domain/tmdb/IMovieDetail";
import { PageProps } from "gatsby";
import { getQuerystringParams } from "../utils";
import { SpinnerPanel } from "../components/spinnerPanel";
import { IMovieImage } from "../domain/tmdb/IMovieImage";
import { Theme, WithThemeProps } from "../types/theme";
import { GridItem } from "../components/gridItem";
import { Grid } from "../components/grid";
import Image from 'gatsby-image';
import { Typography } from "../components/typography";
import { Stack } from "../components/stack";
import { RatingStars } from "../components/ratingStars";
import { InteractiveRatingStars } from "../components/InteractiveRatingStars";
import { WatchListButton } from "../components/watchListButton";
import { Media } from "../components/media";

type State = {
  loading: boolean;
  movie: IMovie | undefined;
  details: IMovieDetail | undefined;
  backgroundImage: IMovieImage | undefined;
}

type PageParams = {
  movieId: string;
}

const Movie = ({ location }: PageProps) => { 
  
  const params = getQuerystringParams<PageParams>(location.search);
  let movieId = params ? parseInt(params.movieId) : null;
  const theme = useTheme() as Theme;
  const { isLoggedin, isInitializing } = useContext(AuthContext);
  const [ state, setState ] = useState<State>({
    loading: true,
    movie: undefined,
    details: undefined,
    backgroundImage: undefined
  });

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
      console.log(creditsResponse);

      if(detailResponse.success) {
        setState({
          ...state,
          loading: false,
          movie,
          details: detailResponse.data,
          backgroundImage: getBackdropImage(imagesResponse.data?.backdrops)
        });
      }
      
    }
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin && movieId) {
      loadMovie(movieId); 
    }
  }, [isInitializing]);


  if(!state.details) {
    return null;
  }

  const getBackgroudImageUrl = (): string => {
    if(!state.details) {
      return '';
    }
    const { backdrop_path } = state.details;
    return `//image.tmdb.org/t/p/w1000_and_h450_face/${backdrop_path}`
  }

  const renderMovie = () => {

    if(!state.movie || !state.details) {
      return null;
    }

    return (
      <Fragment>

        <MovieHeader>
          <Grid>
            
            <GridItem xs={12} md={4} lg={3}>
              <PosterStyle>
                <Image
                  fluid={{
                    src: `//image.tmdb.org/t/p/w300_and_h450_face/${state.movie.img}`,
                    srcSet: `//image.tmdb.org/t/p/w300_and_h450_face/${state.movie.img}`,
                    sizes: '',
                    aspectRatio: 300/450
                  }}
                />
              </PosterStyle>            
            </GridItem>

            <GridItem xs={12} md={8} lg={9}>
              <MovieHeaderStack>
                
                <Typography as="h2">{state.details.title}</Typography>        
                
                <div>
                  <Typography as="h4">{state.details.release_date}, {state.details.runtime} minutes</Typography>
                  <Typography block>{state.details.genres.map(g => g.name).join(', ')}</Typography>
                </div>

                <Grid>
                  <GridItem xs={12} md={8} align="left">

                    <PanelWrapper>
                      <Grid>
                        <GridItem xs={6} align="center">
                          <RatingContainer>
                            <span>Users rating</span>                    
                            <RatingStars rating={state.movie.avgRating} />        
                          </RatingContainer>                      
                        </GridItem>
                        <GridItem xs={6} align="center">
                          <RatingContainer>
                            <span>Your rating</span>                    
                            <InteractiveRatingStars 
                              color={theme.palette.tertiary.main} 
                              rating={state.movie.avgRating}
                              />          
                          </RatingContainer>
                        </GridItem>
                      </Grid> 
                    </PanelWrapper>

                  </GridItem>
                  <GridItem xs={12} md={4} align="right">
                    <MyListPanelWrapper>
                      <WatchListButton 
                        loading={false}
                        inWatchlist={state.movie.watchlist}
                        onClick={() => {}}
                        size={24}
                        />
                      <Typography component="span">Add to My List</Typography>
                    </MyListPanelWrapper>
                  </GridItem>            
                </Grid>    

                
                <Typography block as={(styled.h4``)}><i>{state.details.tagline}</i></Typography>
                <Typography block >{state.details.overview}</Typography>
                
                
                <div>
                  <Typography block as={styled.h4({})}>Director</Typography>
                  <Typography block >{state.movie.director}</Typography>
                </div>                

              </MovieHeaderStack>

            </GridItem>            
          </Grid>          
        </MovieHeader>
                
      </Fragment>
    )
  }

  return (
    <PrivateRoute>
      <SpinnerPanel show={state.loading}/>
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
      <MovieDetails>
        {renderMovie()}
      </MovieDetails>      
    </PrivateRoute>
  );
}

const PosterStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: none;
    width:  100%;
    height: fit-content;
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.palette.secondary.main};
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.47);

    @media (min-width: ${theme.breakPoints.md}px) {
      display: block;
    }
  `}
`

const PanelWrapper = styled.div`
  ${({ theme }: WithThemeProps) => css`
    padding: ${theme.gutter/1.5}px ${theme.gutter}px;
    width: 100%;
    background-color: rgba(3,29,51,0.5);
    border-radius: ${theme.borderRadius.lg};
  `}
`

const MyListPanelWrapper = styled(PanelWrapper)`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    margin-top: ${theme.gutter}px;

    & > *:last-child {
      margin-left: 5px;
    }

    @media (min-width: ${theme.breakPoints.md}px) {
      margin-top: 0;
    }
  `}
`

const RatingContainer = styled.div`
  ${({ theme }: WithThemeProps) => css`
    
    text-align: center;
    font-size: ${theme.typography.size.small};
    color: ${theme.palette.secondary.lighter};
    & > div {
      margin-top: 5px;
      max-width: 100px;
    }

    @media (min-width: ${theme.breakPoints.md}px) {
      font-size: ${theme.typography.size.main};
      /* display: flex;
      text-align: left;
      align-items: center;
      width: 100%; */

      /* & > *:first-child {
        padding-right: 10px;
      } */
    }
  `}
`

const MovieHeaderStack = styled(Stack)`
  ${({ theme }: WithThemeProps) => css`
    width: 100%;

    & > * {
      margin-bottom: 20px;
    }

    @media (min-width: ${theme.breakPoints.md}px) {
      padding-left: 5%;
    }
  `}
`

const MovieHeader = styled(Container)`
  ${({ theme }: WithThemeProps) => css`
    
    transition: padding .4s ease;
    padding-bottom: 25px;
    
    @media (min-width: ${theme.breakPoints.md}px) {
      padding-top: 50px;
    }
  `}
`
const MovieBackgroud = styled.div`
  ${({ theme }: WithThemeProps) => {
    return css`
      position: relative;
      width: 100%;

      img {
        max-width: 100%;
      }
      
      @media (min-width: ${theme.breakPoints.md}px) {
        position: absolute;
        z-index: -1;

        &:after {
          content: '';
          position: absolute;
          background-color: rgba(0,15,27,0.8);
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

const MovieDetails = styled.div`
  ${({ theme }: WithThemeProps) => {
    return css`
      position: relative;
      padding-top: 20px;
      
      @media (min-width: ${theme.breakPoints.md}px) {
        z-index: 1;
      }

      /* ${Typography} {
        margin-bottom: 20px;
      } */
    `
  }}
`

export default Movie
