import React from 'react';
import styled, { keyframes, css } from 'styled-components';

type Props = {
    width?: number;
    className?: string;
}

export function Spinner({ width, ...rest }: Props) {
    const spinnerSize = width ? width : 60;
    return <SpinnerStyle {...rest} width={spinnerSize}/>;
}

const RotationKeyFrames = keyframes`
    ${'0%'} { transform: rotate(0deg) }
    ${'100%'} { transform: rotate(360deg) }
`

const SpinnerStyle = styled.div`
    ${({width}:{ width: number }) => {
        const borderSize = width*0.1;
        return css`
            border: ${borderSize}px solid rgba(255,255,255,.3);
            border-top: ${borderSize}px solid rgba(255,255,255,1);
            border-radius: 50%;
            width: ${width}px;
            height: ${width}px;
            animation: ${RotationKeyFrames} 1.2s linear infinite;   
        `
    }}   

`