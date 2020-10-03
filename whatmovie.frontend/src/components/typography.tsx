import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type TypographyColor = 
    | 'default'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error'
    | 'success'
    | 'warning';

export type TypographySize = 
    | 'sm'
    | 'md'
    | 'lg';

interface Props extends React.HTMLProps<HTMLElement> {
    as?: 'p' | 'span' | 'b' | 'i' | 'strong' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    textColor?: TypographyColor;
    textSize?: TypographySize;
    block?: boolean;
    hidden?: boolean;
    margin?: string;
    ellipsis?: boolean;
};

const TypographyComponent: React.FunctionComponent<Props> = (props: Props) => {
  const { children, textColor, textSize, block, hidden, ref, margin, ellipsis, ...rest } = props;

  if(hidden) {
      return null;
  }

  return (
    <TipographyStyle
      {...rest}
      data-size={textSize}
      data-color={textColor}
      data-block={block}
      data-ellipsis={ellipsis}
      style={{ margin: margin }}
      >
      {children}
    </TipographyStyle>
  )
}

TypographyComponent.defaultProps = {
  as: 'p',
  textColor: 'default',
  textSize: 'md',
  block: false
}

const TipographyStyle = styled.div`
  ${({ theme }: WithThemeProps) => css`

    &[data-size="sm"]{ font-size: ${theme.typography.size.small} }
    &[data-size="md"]{ font-size: ${theme.typography.size.main} }
    &[data-size="lg"]{ font-size: ${theme.typography.size.large} }

    &[data-color="default"]{ color: ${theme.palette.secondary.lighter} }
    &[data-color="primary"]{ color: ${theme.palette.primary.main} }
    &[data-color="tertiary"]{ color: ${theme.palette.tertiary.lighter} }
    &[data-color="success"]{ color: ${theme.palette.success.main} }
    &[data-color="warning"]{ color: ${theme.palette.warning.main} }
    &[data-color="error"]{ color: ${theme.palette.error.main} }

    &[data-ellipsis="true"]{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &[data-block="true"]{ display: block }
  `}
`;

export const Typography = styled<FunctionComponent<Props>>(TypographyComponent)({});