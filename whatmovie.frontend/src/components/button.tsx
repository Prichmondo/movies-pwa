import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps, Color } from '../types/theme';
import { Spinner } from './spinner';

export type ButtonVariant = 
  | 'default'
  | 'primary'
  | 'secondary';

export type ButtonSize = 
  | 'sm'
  | 'md'
  | 'lg';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  testid: string;
  variant?: ButtonVariant;
  buttonSize?: ButtonSize;
  as?: 'a' | 'button';
  block?: boolean;
  loading?: boolean;
};

export const Button: React.FunctionComponent<Props> = (props: Props) => {
    const { children, variant, buttonSize, block, loading, ref, testid, ...rest } = props;

    function getSpinner() {
        
        if(!loading) {
            return null;
        }

        const spinnerWidth = buttonSize === 'sm'
            ? 18 
            : buttonSize === 'lg'
                ? 38
                : 28;

        return (
            <ButtonSpinner width={spinnerWidth} />
        )

    }

    return (
        <ButtonStyle
            {...rest}
            data-testid={testid}
            data-variant={variant} 
            data-size={buttonSize}
            data-block={block}
            >
            {getSpinner()}{children}
        </ButtonStyle>
    )
}

Button.defaultProps = {
    as: 'button',
    variant: 'default',
    buttonSize: 'md',
    block: false
}

const ButtonSpinner = styled(Spinner)`
    ${({width}:{width:number})=>{
        return css`
            position: absolute;
            top: 3px;
            left: 5px;
        `
    }}
`

const ButtonStyle = styled.button`
    ${({ theme }: WithThemeProps) => css`
        &, &:hover, &:active, &:focus {
            min-width: 100px;
            position: relative;
            transition: background-color 0.4s ease;
            padding: 10px 15px;
            border-radius: ${theme.formRadius.md};
            border: 1px solid ${theme.palette.white.main};
            background-color: ${theme.palette.white.main};
            cursor: pointer;
        }

        &:hover {
            border: 1px solid ${theme.palette.secondary.lighter};
            background-color: ${theme.palette.secondary.lighter};
        }

        &[disabled] {
            opacity: .5;
            cursor: initial;
        }

        &[data-block="true"] {
            display: block;
            width: 100%;
        }

        /*VARIANTS*/
        ${GetButtonVariant('primary', theme.palette.primary, theme.palette.white)}
        ${GetButtonVariant('secondary', theme.palette.secondary, theme.palette.white)}
        ${GetButtonVariant('secondary-outlined', theme.palette.secondary, theme.palette.white, theme.palette.secondary.lighter)}

        /* SIZES */
        &[data-size="sm"] {
            border-radius: ${theme.formRadius.lg};
            font-size: ${theme.typography.size.small};
            padding: 5px 7px;
        }

        &[data-size="lg"] {
            border-radius: ${theme.formRadius.lg};
            font-size: ${theme.typography.size.large};
            padding: 15px 20px;
        }
    `}
`;

function GetButtonVariant(name: string, buttonColor: Color, textColor: Color, borderColor: string = '') {
    return css`
        &[data-variant="${name}"] {
            border: 1px solid ${borderColor || buttonColor.main};
            background-color: ${buttonColor.main};
            color: ${textColor.main};
            font-weight: bold;
            &:hover:not([disabled]) {
                border: 1px solid ${borderColor || buttonColor.darker};
                background-color: ${buttonColor.darker};
            }
        }
    `
}