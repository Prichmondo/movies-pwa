import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RatingStars, Props as RatingStarsProps } from './ratingStars';

type Props = {
  disabled?: boolean
  onChange?:(rating: number) => void;
} & RatingStarsProps;

export const InteractiveRatingStars = ({className, onChange, rating, disabled, ...rest}: Props) => {

  const [value, setValue] = useState<number>(rating);
  
  const handleMouseUp = (currentValue: number) => {
    if(!disabled) {
      setValue(currentValue);
    }    
  }

  const handleMouseOut = () => {
    if(!disabled) {
      setValue(rating);
    }
  }

  const handleClick = (currentValue: number) => {
    if(onChange && !disabled) {
      onChange(currentValue);
    }
  }

  useEffect(() => {
    setValue(rating);
  },[rating]);

  return (
    <InteractiveRatingStarsStyle 
      className={className}>
      <InteractiveAreaWrapper>
        <InteractiveArea onClick={() => handleClick(0.5)} onMouseOver={() => handleMouseUp(0.5)} onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(1)} onMouseOver={() => handleMouseUp(1)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(1.5)} onMouseOver={() => handleMouseUp(1.5)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(2)} onMouseOver={() => handleMouseUp(2)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(2.5)} onMouseOver={() => handleMouseUp(2.5)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(3)} onMouseOver={() => handleMouseUp(3)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(3.5)} onMouseOver={() => handleMouseUp(3.5)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(4)} onMouseOver={() => handleMouseUp(4)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(4.5)} onMouseOver={() => handleMouseUp(4.5)}  onMouseOut={handleMouseOut} />
        <InteractiveArea onClick={() => handleClick(5)} onMouseOver={() => handleMouseUp(5)}  onMouseOut={handleMouseOut} />
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