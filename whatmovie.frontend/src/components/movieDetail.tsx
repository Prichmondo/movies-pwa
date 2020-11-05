import React, { Fragment } from "react"
import { IMovie } from "../domain/IMovie";
import { Container } from "./container";
import styled, { css } from "styled-components";
import { IMovieDetail } from "../domain/tmdb/IMovieDetail";
import { WithThemeProps } from "../types/theme";
import { Typography } from "./typography";
import { Stack } from "./stack";
import MovieDetailAction from "./movieDetailActions";
import { Grid } from "./grid";
import { GridItem } from "./gridItem";
import Image from 'gatsby-image';
import { ParagraphSkeleton } from "./skeletons/paragraphSkeleton";
import { H1Skeleton, H4Skeleton, TextSkeleton } from "./skeletons/textSkeleton";
import { ImageSkeleton } from "./skeletons/imageSkeleton";

type Props = {
  loading: boolean;
  movie: IMovie | undefined;
  details: IMovieDetail | undefined;
  watchlistLoading: boolean;
  ratingLoading: boolean;
  onWatchListChange: () => void;
  onRatingChange: (value: number) => void;
}


const MovieDetail = ({
  loading,
  movie,
  details,
  watchlistLoading,
  ratingLoading,
  onWatchListChange,
  onRatingChange
}: Props) => { 
  
  const renderPosterImage = () => {
    
    if(loading) {
      return <PosterStyle><ImageSkeleton ratio={300/450} /></PosterStyle>;
    }

    if(!movie) {
      return null;
    }

    return(
      <PosterStyle>
        <Image
          fluid={{
            src: `//image.tmdb.org/t/p/w300_and_h450_face/${movie.img}`,
            srcSet: `//image.tmdb.org/t/p/w300_and_h450_face/${movie.img}`,
            sizes: '',
            aspectRatio: 300/450
          }} />
      </PosterStyle>
    );
  }

  const renderDirector = () => {

    if(loading) {
      return null
    }

    return (
      <div>
        <Typography testid="director-label" block component="h4">Director</Typography>
        <Typography testid="director-name" block >{movie ? movie.director : ''}</Typography>
      </div>
    )
  }

  const renderOverview = () => {

    if(loading) {
      return (
        <Fragment>
          <H4Skeleton />            
          <ParagraphSkeleton rows={5} />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Typography testid="tagline" block italic component="h4">{details ? details.tagline : ''}</Typography>
        <Typography testid="overview" block >{details ? details.overview : ''}</Typography>
      </Fragment>
    )
  }

  const renderHeading = () => {

    if(loading) {
      return (
        <Fragment>
          <H1Skeleton />
          <H4Skeleton />
          <H4Skeleton />            
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Typography testid="movie-title" component="h2" bold>
          {details ? details.title : <>&nbsp;</>}
        </Typography>
        <Typography testid="movie-runtime" component="h4">
          {details ? details.release_date : ''}, {details ? details.runtime : ''} minutes
        </Typography>
        <Typography testid="movie-genres" block>{details ? details.genres.map(g => g.name).join(', ') : ''}</Typography>
      </Fragment>
    )
  }

  return (
    <DetailContainer>
      <Grid>
        
        <GridItem xs={12} md={4} lg={3}>
          {renderPosterImage()}       
        </GridItem>

        <GridItem xs={12} md={8} lg={9}>
          <MovieHeaderStack>            
            {renderHeading()}
            <MovieDetailAction
              loading={loading}
              userRating={movie ? movie.userRating : 0}
              avgRating={movie ? movie.avgRating : 0}
              watchList={movie ? movie.watchlist : false}
              watchlistLoading={watchlistLoading}
              ratingLoading={ratingLoading}
              onWatchListChange={onWatchListChange}
              onRatingChange={onRatingChange}
            />
            {renderOverview()}            
            {renderDirector()}
          </MovieHeaderStack>

        </GridItem>            
      </Grid>          
    </DetailContainer>
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

const DetailContainer = styled(Container)`
  ${({ theme }: WithThemeProps) => css`
    
    transition: padding .4s ease;
    padding-top: 20px;
    padding-bottom: 25px;
    
    @media (min-width: ${theme.breakPoints.md}px) {
      padding-top: 80px;
      padding-bottom: 50px;
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
`;

export default MovieDetail
