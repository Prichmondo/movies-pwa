import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type CardVariant = 
  | 'white'
  | 'black'
  | 'secondary';

interface Props extends React.HTMLProps<HTMLDivElement> {
    variant?: CardVariant;
    block?: boolean;
    margin?: string;
};

export const Card: React.FunctionComponent<Props> = (props: Props) => {
  const { ref, as, variant, block, margin, ...rest } = props;
  return (
    <CardStyle
      {...rest}
      style={{ margin }}
      data-variant={variant}
      data-block={block}
      />
  )
}

Card.defaultProps = {
  variant: 'white',
  block: false
}

const CardStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`
    
    max-width: 500px;
    margin: 0 auto;
    padding: ${theme.gutter}px;
    border-radius: ${theme.formRadius.md};
    background-color: rgba(255,255,255,0.6);        

    @media(min-width: ${theme.breakPoints.md}px) {
      padding: ${theme.gutter*2}px;
    }

    &[data-block="true"] {
      display: block;
      width: 100%;
    }
    
    /* VARIANTS */
    &[data-variant="black"] {
      background-color: rgba(0, 0, 0, 0.8);  
    }

    &[data-variant="secondary"] {
      background-color: rgba(3, 29, 51, 0.5);  
    }
  `}
`;

export const FormCard = styled(Card)``