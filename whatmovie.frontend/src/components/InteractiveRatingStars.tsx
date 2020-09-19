import React, { useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { WithThemeProps, Color, Theme } from '../types/theme';
import { RatingStars, Props as RatingStarsProps } from './ratingStars';

type Props = {
} & RatingStarsProps;

export const InteractiveRatingStars = ({className, rating, ...rest}: Props) => {

  const [value, setValue] = useState<number>(rating);
  
  const handleMouseUp = (currentValue: number) => {
    setValue(currentValue);
  }

  return (
    <InteractiveRatingStarsStyle 
      className={className}>
      <InteractiveAreaWrapper>
        <InteractiveArea onMouseOver={() => handleMouseUp(0.5)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(1)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(1.5)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(2)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(2.5)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(3)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(3.5)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(4)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(4.5)} />
        <InteractiveArea onMouseOver={() => handleMouseUp(5)} />
      </InteractiveAreaWrapper>      
      <RatingStars {...rest} rating={value} />
    </InteractiveRatingStarsStyle>
  )
}

const InteractiveArea = styled.div`
  width: 10%;
  height: 100%;
  cursor: pointer;
`;

const InteractiveAreaWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const InteractiveRatingStarsStyle = styled.div`
  position: relative;
 
`;