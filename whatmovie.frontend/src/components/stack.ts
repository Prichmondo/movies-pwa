import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { WithThemeProps } from "../types/theme";
import { Grid } from "../components/grid";

export const Stack = styled.div`
  ${({ theme } : WithThemeProps) => {
    return css`
      & > * {
        display: block;
        margin-bottom: 20px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }

      & > ${Grid} {
        display: flex;
      }
    `
  }}

`