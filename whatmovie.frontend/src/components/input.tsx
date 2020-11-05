import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type InputSize = 
  | 'sm'
  | 'md'
  | 'lg';

export type InputVariant = 
  | 'default'
  | 'secondary';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  testid: string;
  inputSize?: InputSize;
  variant?: InputVariant;
  block?: boolean;
  error?: boolean;
};

export const Input: React.FunctionComponent<Props> = (props: Props) => {
  
  const { inputSize, error, ref, as, block, variant, testid, ...rest } = props;
  
  return (
    <InputStyle
      {...rest}
      data-testid={testid}
      data-error={error}
      data-size={inputSize}
      data-block={block}
      data-variant={variant}
      />
  )
}

Input.defaultProps = {
  inputSize: 'md',
  block: false
}

const InputStyle = styled.input`
  ${({ theme }: WithThemeProps) => css`
      
    transition: background-color 0.4s ease;
    padding: 10px 15px;
    border-radius: ${theme.formRadius.md};
    border: none;
    background-color: ${theme.palette.white.main};
    border: 1px solid ${theme.palette.white.main};

    &[disabled] {
      opacity: .8;
    }

    &[data-block="true"] {
      display: block;
      width: 100%;
    }

    &[data-error="true"] {
      color: ${theme.palette.error.main};
    }
    
    /* SIZES */
    &[data-size="sm"] {
      border-radius: ${theme.formRadius.sm};
      font-size: ${theme.typography.size.small};
      padding: 5px 7px;
    }

    &[data-size="lg"] {
      border-radius: ${theme.formRadius.lg};
      font-size: ${theme.typography.size.large};
      padding: 15px 20px;
    }

    &[data-variant="secondary"] {
      color: ${theme.palette.secondary.lighter};
      background-color: ${theme.palette.secondary.darker};
      border: 1px solid ${theme.palette.secondary.lighter};
      &::placeholder {
        color: ${theme.palette.secondary.lighter};
        opacity: 0.5;
      }
    }
  `}
`;