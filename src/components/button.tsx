import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type ButtonVariant = 
    | 'default'
    | 'primary'
    | 'secondary';

export type ButtonSize = 
    | 'sm'
    | 'md'
    | 'lg';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    variant?: ButtonVariant;
    buttonSize?: ButtonSize;
    as?: 'a' | 'button';
    block?: boolean;
};

export const Button: React.FunctionComponent<Props> = (props: Props) => {
    const { children, variant, buttonSize, block, ref, ...rest } = props;
    return (
        <ButtonStyle
            {...rest}
            data-variant={variant} 
            data-size={buttonSize}
            data-block={block}
            >
            {children}
        </ButtonStyle>
    )
}

Button.defaultProps = {
    as: 'button',
    variant: 'default',
    buttonSize: 'md',
    block: false
}

const ButtonStyle = styled.button`
    ${({ theme }: WithThemeProps) => css`
        &, &:hover, &:active, &:focus {
            transition: background-color 0.4s ease;
            padding: 10px 15px;
            border-radius: ${theme.borderRadius.md};
            border: none;
            background-color: ${theme.palette.white.main};
            cursor: pointer;
        }

        &:hover {
            background-color: ${theme.palette.white.darker};
        }

        &[data-block="true"] {
            display: block;
            width: 100%;
        }

        /*VARIANTS*/

        &[data-variant="primary"] {
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.white.main};
            font-weight: bold;
            &:hover {
                background-color: ${theme.palette.primary.darker};
            }
        }

        &[data-variant="secondary"] {
            background-color: ${theme.palette.secondary.main};
            color: ${theme.palette.white.main};
            font-weight: bold;
            &:hover {
                background-color: ${theme.palette.secondary.darker};
            }
        }

        /* SIZES */
        &[data-size="sm"] {
            font-size: ${theme.typography.size.small};
            padding: 5px 7px;
        }

        &[data-size="lg"] {
            font-size: ${theme.typography.size.large};
            padding: 15px 20px;
        }
    `}
`;