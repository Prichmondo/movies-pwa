import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../types/theme';
import { Typography } from './typography';
import { Star } from '../icons/star';
import { formatNumber } from '../utils/numbers';

interface Props {
  testid: string;
  rating: number;
  color?: string;
  className?: string;
};

export const Rating = ({ testid, rating, color, className }: Props) => {

  const theme = useTheme() as Theme;
  const starColor = color ? color : theme.palette.primary.lighter;
  const value = rating ? formatNumber(rating, 1) : '...';

  return (
    <RatingStyle className={className}>
      <Star fill={starColor} opacity={rating ? 1 : 0.4} />
      <Typography testid={`${testid}-rating-value`} textSize="sm" >{value}</Typography>    
    </RatingStyle>
  );
}

const RatingStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    max-width: 14px;
  }

  ${Typography} {
    padding-left: 2px;
  }  
`