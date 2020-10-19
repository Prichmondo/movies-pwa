import styled, { css } from 'styled-components';
import { WithThemeProps } from '../../types/theme';

export const TextSkeleton = styled.div`
  ${({ theme }: WithThemeProps) => css`
    background-color: ${theme.palette.secondary.lighter};
    width: 100%;
    height: 12px;
    border-radius: 50px;
    opacity: 0.2;
    margin-bottom: 7px;
  `}
`

export const H1Skeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 50%;
    height: 30px;
    @media (min-width: ${theme.breakPoints.md}px) {
      height: 40px;
    }
  `}
`

export const H2Skeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 40%;
    height: 27px;
    @media (min-width: ${theme.breakPoints.md}px) {
      height: 36px;
    }
  `}
`

export const H3Skeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 30%;
    height: 22px;
    @media (min-width: ${theme.breakPoints.md}px) {
      height: 30px;
    }
  `}
`

export const H4Skeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 30%;
    height: 19px;
    @media (min-width: ${theme.breakPoints.md}px) {
      height: 24px;
    }
  `}
`

export const SubheadingSkeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 50%;
    height: 15px;
  `}
`

export const CaptionSkeleton = styled(TextSkeleton)`
  ${({ theme }: WithThemeProps) => css`
    width: 50%;
    height: 8px;
  `}
`
