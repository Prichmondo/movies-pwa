import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { WithThemeProps, Color, Theme } from '../types/theme';
import { IMovie } from '../domain/IMovie';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { Star } from '../icons/star';

interface Props {
  className?: string;
  color?: Color;
  value: number;
};

export const RatingStar = ({ value, color, className }: Props) => {
  
  const theme = useTheme() as Theme;

  if(value > 1) throw new Error('Star value can not be greater than 1');

  let displayValue = 1;

  if(value < 1) {
    if(value >= 0.4 && value <= 0.7) {
      displayValue = 0.5;
    } else {
      displayValue = 0;
    }
  }

  const fillerColor = color ? color : theme.palette.primary;
  const perc = 100*displayValue;

  return (
    <RatingStarStyle className={className}>
      <StarFiller style={{ width: `${100*displayValue}%`}}>
        <Star fill={fillerColor.lighter} width={`${100*100/perc}%`} height="auto" />
      </StarFiller>
      <Star fill={theme.palette.secondary.darker} width="100%" height="auto" />
    </RatingStarStyle>
  )
}

const RatingStarStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    position: relative;
    width: 100%;
  `}
`;

const StarFiller = styled.div`
  ${({ theme }: WithThemeProps) => css`
    position: absolute;
    overflow: hidden;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`;

