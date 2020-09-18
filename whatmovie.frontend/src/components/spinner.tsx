import React from 'react';
import styled, { keyframes, css } from 'styled-components';

type Props = {
  width?: number;
  className?: string;
  borderSize?: number;
  variant?: 'white' | 'secondary'
}

export function Spinner({ width, borderSize, variant, ...rest }: Props) {
  const spinnerSize = width ? width : 60;
  return <SpinnerStyle 
    {...rest}
    data-variant={variant}
    width={spinnerSize} 
    borderSize={borderSize || spinnerSize*0.1}
    />;
}

const RotationKeyFrames = keyframes`
  ${'0%'} { transform: rotate(0deg) }
  ${'100%'} { transform: rotate(360deg) }
`

const SpinnerStyle = styled.div`
  ${({width, borderSize}:{ width: number, borderSize: number }) => {
    return css`
      border: ${borderSize}px solid rgba(255,255,255,.3);
      border-top: ${borderSize}px solid rgba(255,255,255,1);
      border-radius: 50%;
      width: ${width}px;
      height: ${width}px;
      animation: ${RotationKeyFrames} 1.2s linear infinite; 
      
      &[data-variant="secondary"]{
        border: ${borderSize}px solid rgba(162,209,248,.3);
        border-top: ${borderSize}px solid rgba(162,209,248,1);
      }
    `
  }}
`