import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { WithThemeProps, Color, Theme } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { RatingStar } from './ratingStar';

interface Props {
  className?: string;
  rating: number;
  color?: Color;
};

export const RatingStars = ({ rating, className, color }: Props) => {

  const theme = useTheme() as Theme;
  const starsColor: Color = color ? color : theme.palette.primary;
  const values = [];

  for(let i = 0, value: number; i<5; i++) {
    value = rating-i;
    if(value < 0) {
      value = 0;
    } else if (value >= 1) {
      value = 1;
    };
    values.push(<RatingStar color={starsColor} value={value} />);
  }

  return (
    <StarsStyle className={className}>
      {values}
    </StarsStyle>
  )
}

const StarsStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    > * {
      width: 20%;
      justify-content: center;
    }
  `}
`;