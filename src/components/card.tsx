import React from 'react';
import styled, { css } from 'styled-components';
import { WithThemeProps } from '../types/theme';

export type CardVariant = 
    | 'white'
    | 'black';

interface Props extends React.HTMLProps<HTMLDivElement> {
    variant?: CardVariant;
    block?: boolean;
};

export const Card: React.FunctionComponent<Props> = (props: Props) => {
    const { ref, as, variant, block, ...rest } = props;
    return (
        <InputStyle
            {...rest}
            data-variant={variant}
            data-block={block}
            />
    )
}

Card.defaultProps = {
    variant: 'white',
    block: false
}

const InputStyle = styled.div`
    ${({ theme }: WithThemeProps) => css`
        
        padding: ${theme.gutter*2}px;
        border-radius: ${theme.borderRadius.md};
        background-color: rgba(255,255,255,0.6);        

        &[data-block="true"] {
            display: block;
            width: 100%;
        }
        
        /* SIZES */
        &[data-variant="black"] {
            background-color: rgba(0,0,0,0.6);  
        }
    `}
`;