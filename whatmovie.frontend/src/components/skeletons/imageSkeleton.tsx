import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../../types/theme';

interface Props {
    ratio: number;
};

export const ImageSkeleton = styled<FunctionComponent<Props>>((props: Props) => {
  const { ratio, ...rest } = props;

  return (
    <ImageSkeletonStyle
      {...rest}
      style={{ paddingTop: `${100/ratio}%`}}
    />
  )
})``;

ImageSkeleton.defaultProps = {
  ratio: 1
}

const ImageSkeletonStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    background-color: ${theme.palette.secondary.lighter};
    width: 100%;
    border-radius: ${theme.borderRadius.lg};
    opacity: 0.2;
  `}
`;