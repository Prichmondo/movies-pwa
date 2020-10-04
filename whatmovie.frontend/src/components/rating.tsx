import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Theme, WithThemeProps } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import { Typography } from './typography';
import { RatingStars } from './ratingStars';
import { Grid } from './grid';
import { GridItem } from './gridItem';
import { InteractiveRatingStars } from './InteractiveRatingStars';
import { Star } from '../icons/star';
import { WatchListButton } from './watchListButton';
import { formatNumber } from '../utils/numbers';

interface Props {
  rating: number;
  color?: string;
  className?: string;
};

export const Rating = ({ rating, color, className }: Props) => {

  const theme = useTheme() as Theme;
  const starColor = color ? color : theme.palette.primary.lighter;
  const value = rating ? formatNumber(rating, 1) : '...';

  return (
    <RatingStyle className={className}>
      <Star fill={starColor} opacity={rating ? 1 : 0.4} /><Typography textSize="sm" >{value}</Typography>    
    </RatingStyle>
  );
}

const RatingStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      max-width: 14px;
    }
    ${Typography} {
      padding-left: 2px;
    }
    
  `}
  
`