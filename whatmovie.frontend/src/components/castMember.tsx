import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';
import Image from 'gatsby-image';
import { Typography } from './typography';
import { ICastMember } from '../domain/tmdb/ICastMember';

interface Props {
  castMember: ICastMember;
};

export const CastMember = ({ castMember }: Props) => {

  const imagePath = `//image.tmdb.org/t/p/w138_and_h175_face/${castMember.profile_path}`;

  return (
    <MovieStyle>
      <ImageWrapper>
        <Image
          fluid={{
            aspectRatio: 138/175,
            src: imagePath,
            srcSet: imagePath,
            sizes: ''          
          }}
        />
      </ImageWrapper>
      <Info>
        <Typography textSize="sm" textColor="tertiary">{castMember.name}</Typography>               
        <Typography textSize="sm" italic>{castMember.character}</Typography>
      </Info>
    </MovieStyle>
  );
}

const ImageWrapper = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
`;

const Info = styled.div`
  padding: 10px;
`;

const MovieStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    
    width: 100%;
    background-color: ${theme.palette.secondary.main};
    margin-bottom: ${theme.gutter}px;
    transition: border .4s ease;
    border: 2px solid transparent;
  `}
`;