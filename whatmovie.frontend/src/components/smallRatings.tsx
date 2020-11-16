import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Theme, WithThemeProps } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import { Typography } from './typography';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { InteractiveRatingStars } from './InteractiveRatingStars';
import { Rating } from './rating';

interface Props {
  testid: string;
  movie: IMovie;
  loading?: boolean;
  className?: string;
  onChange?: (userRating: number) => void;
};

export const SmallRatings = ({ movie, loading, className, testid, onChange }: Props) => {

  const theme = useTheme() as Theme;

  return (
    <RatingsStyle className={className} data-loading={loading}>
      <StarGrid>
        <GridItem xs={6} valign="middle" align="center">
          <Rating testid={`${testid}-avg`} rating={movie.avgRating} />
        </GridItem>
        <GridItem xs={6} valign="middle" align="center">
          <Rating testid={`${testid}-user`} rating={movie.userRating} color={theme.palette.tertiary.main}/>
        </GridItem>
      </StarGrid>
      <RatingDrawer>
        <UserRatingWrapper>
          <InteractiveRatingStars
            onChange={onChange}
            disabled={loading}
            rating={movie.userRating} 
            color={theme.palette.tertiary.main} 
            />
        </UserRatingWrapper>
      </RatingDrawer>      
    </RatingsStyle>
  );
}

const StarGrid = styled(Grid)`
  ${({ theme }: WithThemeProps) => css`
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s ease;
    margin-left: -5px;
    margin-right: -5px;
    
    ${GridItem} {
      padding-left: 5px;
      padding-right: 5px;
    }
  `}  
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
  ${({ theme }: WithThemeProps) => css`
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background-color: #0b2840;
    border-radius: 50px;
    transition: background .2s linear;

    &[data-loading="false"]:active {
      background-color: ${theme.palette.secondary.lighter};
    }
    
    &[data-loading="true"],
    &:hover {
      ${RatingDrawer} {
        top: 1px;
      }
      ${StarGrid} {
        opacity: 0;
        visibility: hidden;
      }
    }
  `}  
`