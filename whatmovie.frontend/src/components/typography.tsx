import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps, Color } from '../types/theme';
import { Spinner } from './spinner';

export type TypographyColor = 
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning';

export type TypographySize = 
    | 'sm'
    | 'md'
    | 'lg';

interface Props extends React.HTMLProps<HTMLElement> {
    textColor?: TypographyColor;
    textSize?: TypographySize;
    as?: 'p' | 'span' | 'b' | 'i' | 'strong' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    block?: boolean;
    hidden?: boolean;
};

export const Typography: React.FunctionComponent<Props> = (props: Props) => {
  const { children, textColor, textSize, as, block, hidden, ref, ...rest } = props;

  if(hidden) {
      return null;
  }
  
  return (
    <TipographyStyle
      {...rest} 
      data-size={textSize}
      data-color={textColor}
      data-block={block}
      >
      {children}
    </TipographyStyle>
  )
}

Typography.defaultProps = {
  as: 'p',
  textColor: 'default',
  textSize: 'md',
  block: false
}

const TipographyStyle = styled.p`
  ${({ theme }: WithThemeProps) => css`
      &[data-size="sm"]{ font-size: ${theme.typography.size.small} }
      &[data-size="md"]{ font-size: ${theme.typography.size.main} }
      &[data-size="lg"]{ font-size: ${theme.typography.size.large} }

      &[data-color="default"]{ color: ${theme.palette.white.main} }
      &[data-color="primary"]{ color: ${theme.palette.primary.main} }
      &[data-color="secondary"]{ color: ${theme.palette.secondary.main} }
      &[data-color="success"]{ color: ${theme.palette.success.main} }
      &[data-color="warning"]{ color: ${theme.palette.warning.main} }
      &[data-color="error"]{ color: ${theme.palette.error.main} }

      &[data-block="true"]{ display: block }
  `}
`;