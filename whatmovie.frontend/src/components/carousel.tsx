import React, { ReactNode, useRef } from "react"
import styled, { css, useTheme } from "styled-components"
import { ChevronLeft } from "../icons/chevronLeft"
import { ChevronRight } from "../icons/chevronRight"
import { MediaBreakPoints, Theme, WithThemeProps } from "../types/theme"
import { GetBreakPoint } from "../utils/responsive"
import { SpinnerPanel } from "./spinnerPanel"

type Props = {
  children: ReactNode[];
  loading?: boolean;
}

const CAROUSEL_MARGINS: {[key in MediaBreakPoints]: number } = {
  xs: 15,
  sm: 15,
  md: 60,
  lg: 60,
  xl: 60
};

export function Carousel({ children, loading }: Props) {

  const carousel = useRef<HTMLDivElement>(null);
  const theme = useTheme() as Theme;

  function handlePageChange(page: number) {    
    if(carousel.current) {
      const breakpint = GetBreakPoint(theme);
      const margin = CAROUSEL_MARGINS[breakpint];
      carousel.current.scrollBy({ left: page * (carousel.current.offsetWidth - margin*2), top: 0 })
    }
  }

  function renderItems() {
    return (
      <CarouselGrid>
        <CarouselMargin />
        {children.map((item, i) => (
          <CarouselGridItem key={i}>
            {item}
          </CarouselGridItem>
        ))}
        <CarouselMargin />
      </CarouselGrid>
    );
  }

  return (
    <CarouselStyle>
      <SpinnerPanel show={loading || false} />
      <ChevronLeft
        fill="#fff"
        width={50}
        height={50}
        data-active={true}
        onClick={() => handlePageChange(-1)}
        />
      <CarouselWrapper ref={carousel}>
        {renderItems()}
      </CarouselWrapper>      
      <ChevronRight
        fill="#fff"
        width={50}
        height={50}
        data-active={true}
        onClick={() => handlePageChange(+1)}
        />
    </CarouselStyle>
  )
}

const CarouselGrid = styled.div`
 ${({ }:WithThemeProps) => {
    return css`
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      margin-bottom: 8px;
    `
  }}  
`;

const CarouselGridItem = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex: 0 0 calc((100% - ${CAROUSEL_MARGINS.xs*2}px) / 2.1);
      padding-right: ${theme.gutter/3}px;
      padding-left: ${theme.gutter/3}px;

      @media (min-width: ${theme.breakPoints.sm}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.sm*2}px) / 3.1);
      }

      @media (min-width: ${theme.breakPoints.md}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.md*2}px) / 4);
      }

      @media (min-width: ${theme.breakPoints.lg}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.lg*2}px) / 6);
      }

      @media (min-width: ${theme.breakPoints.xl+200}px) {
        flex-basis: calc((100% - ${CAROUSEL_MARGINS.xl*2}px) / 8);
      }
    `
  }}
`

const CarouselMargin = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      display: flex;
      flex: 0 0 ${CAROUSEL_MARGINS.xs}px;
      padding-right: ${theme.gutter/2}px;
      padding-left: ${theme.gutter/2}px;

      @media (min-width: ${theme.breakPoints.sm}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.sm}px
      }

      @media (min-width: ${theme.breakPoints.md}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.md}px
      }

      @media (min-width: ${theme.breakPoints.lg}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.lg}px
      }

      @media (min-width: ${theme.breakPoints.xl}px ){ 
        flex-basis: ${CAROUSEL_MARGINS.xl}px
      }
    `
  }}
`

const CarouselWrapper = styled.div`
  ${({ }:WithThemeProps) => {
    return css`
      overflow: hidden;
      overflow-x: scroll;
      width: 100%;
      margin-bottom: -18px;
      scroll-behavior: smooth;
    `
  }}
`

const CarouselStyle = styled.div`
  ${({ theme }:WithThemeProps) => {
    return css`
      width: 100%;
      background-color: ${theme.palette.secondary.darker};
      position: relative;
      z-index: 0;
      overflow-y: hidden;

      & > svg {
        display: none;
      }

      &:after, &:before {
        content: '';
        width: ${CAROUSEL_MARGINS.xs}px;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;

        @media (min-width: ${theme.breakPoints.sm}px ){ 
          width: ${CAROUSEL_MARGINS.sm}px
        }

        @media (min-width: ${theme.breakPoints.md}px ){ 
          width: ${CAROUSEL_MARGINS.md}px
        }

        @media (min-width: ${theme.breakPoints.lg}px ){ 
          width: ${CAROUSEL_MARGINS.lg}px
        }

        @media (min-width: ${theme.breakPoints.xl}px ){ 
          width: ${CAROUSEL_MARGINS.xl}px
        }
      }

      &:before {
        left: 0;
        background-image: linear-gradient(-90deg, rgba(0,15,27,0), rgba(0,15,27,1));
      }

      &:after {
        right: 0;
        background-image: linear-gradient(90deg, rgba(0,15,27,0), rgba(0,15,27,1));
      }

      @media (min-width: ${theme.breakPoints.md}px) {
        & > svg {
          display: block;
          cursor: pointer;
          position: absolute;
          z-index: 2;
          top: 50%;
          margin-top: -25px;
        }

        & > svg:first-child {
          left: 0;
        }

        & > svg:last-child {
          right: 0;
        }

        &:before {
          left: 0;
          background-image: linear-gradient(-90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
        }

        &:after {
          right: 0;
          background-image: linear-gradient(90deg, rgba(0,15,27,0.4), rgba(0,15,27,1));
        }
      }
    `
  }}
`