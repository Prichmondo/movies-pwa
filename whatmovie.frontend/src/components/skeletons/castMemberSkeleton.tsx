import React from 'react';
import styled from 'styled-components';
import { MovieStyle, ImageWrapper, Info } from '../castMember';
import { ImageSkeleton } from './imageSkeleton';
import { CaptionSkeleton } from './textSkeleton';

export const CastMemberSkeleton = () => {
  return (
    <MovieStyle>
      <ImageWrapper>
        <CastImageSkeleton ratio={138/175} />
      </ImageWrapper>
      <Info>
        <CaptionSkeleton style={{ width: '70%' }}/>               
        <CaptionSkeleton />
      </Info>
    </MovieStyle>
  );
}

const CastImageSkeleton = styled(ImageSkeleton)`
  border-radius: 0;
`