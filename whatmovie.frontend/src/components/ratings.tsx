import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import { Typography } from './typography';
import { RatingStars } from './ratingStars';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { InteractiveRatingStars } from './InteractiveRatingStars';

interface Props {
  movie: IMovie;
  className?: string;
  onChange?: (userRating: number) => void
};

export const Ratings = ({ movie, className }: Props) => {

  const theme = useTheme() as Theme;

  return (
    <RatingsStyle className={className}>
      <StarGrid>
        <GridItem xs={6} valign="middle">
          <Typography textSize="sm">avg rating</Typography>
        </GridItem>
        <GridItem xs={6} valign="middle">
          <RatingStars rating={movie.avgRating} />
        </GridItem>
      </StarGrid>
      <StarGrid>
        <GridItem xs={6} valign="middle">
          <Typography textSize="sm">your rating</Typography>
        </GridItem>
        <GridItem xs={6} valign="middle">
          <RatingStars rating={movie.userRating} color={theme.palette.tertiary.main} />
        </GridItem>
      </StarGrid>
      <RatingDrawer>
        <Typography block textSize="sm">your rating</Typography>
        <UserRatingWrapper>
          <InteractiveRatingStars rating={movie.userRating} color={theme.palette.tertiary.main} />
        </UserRatingWrapper>
      </RatingDrawer>      
    </RatingsStyle>
  );
}

const StarGrid = styled(Grid)`
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease;
`

const RatingDrawer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  top: 100%;
  left: 0;
  height: 100%;
  width: 100%;
  transition: top 0.4s ease;

  ${Typography} {
    margin-top: 10px;
  }
`

const UserRatingWrapper = styled.div`
  max-width: 100px;
`

const RatingsStyle = styled.div`
  overflow: hidden;
  padding-top:10px;
  cursor: pointer;
  position: relative;

  &:hover {
    ${RatingDrawer} {
      top: 0;
    }
    ${StarGrid} {
      opacity: 0;
      visibility: hidden;
    }
  }
`