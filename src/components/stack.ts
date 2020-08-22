import React, { useState } from "react";
import styled from 'styled-components';

export const Stack = styled.div`
    & > * {
        display: block;
        margin-bottom: 15px;
    }
`