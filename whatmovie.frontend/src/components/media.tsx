import React, { FunctionComponent, ReactNode } from 'react';
import styled, { css, StyledComponentProps } from 'styled-components';
import { WithThemeProps, Theme } from '../types/theme';
import { MediaBreakPoints } from '../types/theme';

type MediaDisplayType = 'block' | 'inline' | 'inline-block' | 'flex';

type MediaProps = {
  children: ReactNode;
  at?: MediaBreakPoints;
  greaterThan?: MediaBreakPoints;
  lessThan?: MediaBreakPoints;
  display?: MediaDisplayType;
}

const defaultProps = {
  display: 'block' as MediaDisplayType
}

const MediaComponent = ({ children, at, greaterThan, lessThan, display, ...rest }: StyledComponentProps<any, Theme, MediaProps, any>) => {

  return (
    <MediaStyle
      display={display}
      data-at={at}
      data-grt={greaterThan}
      data-less={lessThan}
      {...rest}>
      {children}
    </MediaStyle>
  );
}

MediaComponent.defaultProps = defaultProps;

const MediaStyle = styled.div`
  ${({ theme, display }: WithThemeProps & { display: MediaDisplayType }) => css`

    
    &[data-at], &[data-grt], &[data-less] { 
      display: none; 
    }

    /** AT */
    @media (max-width: ${theme.breakPoints.sm-1}px) { 
      &[data-at="xs"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.sm}px) and (max-width: ${theme.breakPoints.md-1}px) { 
      &[data-at="sm"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.md}px) and (max-width: ${theme.breakPoints.lg-1}px) { 
      &[data-at="md"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.lg}px) and (max-width: ${theme.breakPoints.xl-1}px) { 
      &[data-at="lg"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.xl}px) { 
      &[data-at="xl"] { display: ${display}; }   
    }

    /** GREATER THAN */
    @media (min-width: ${theme.breakPoints.sm}px) { 
      &[data-grt="xs"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.md}px) { 
      &[data-grt="sm"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.lg}px) { 
      &[data-grt="md"] { display: ${display}; }   
    }
    @media (min-width: ${theme.breakPoints.xl}px) { 
      &[data-grt="lg"] { display: ${display}; }   
    }

    /** LESS THAN */  
    @media (max-width: ${theme.breakPoints.sm-1}px) { 
      &[data-less="sm"] { display: ${display}; }   
    }
    @media (max-width: ${theme.breakPoints.md-1}px) { 
      &[data-less="md"] { display: ${display}; }   
    }
    @media (max-width: ${theme.breakPoints.lg-1}px) { 
      &[data-less="lg"] { display: ${display}; }   
    }
    @media (max-width: ${theme.breakPoints.xl-1}px) { 
      &[data-less="xl"] { display: ${display}; }   
    }
    
  `}
`;

export const Media = styled<FunctionComponent<MediaProps>>(MediaComponent)({});