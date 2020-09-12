import { createGlobalStyle, css } from 'styled-components';
import { WithThemeProps } from '../types/theme';
 
const GlobalStyle = createGlobalStyle`
  ${({ theme }: WithThemeProps) => css`

    * {
      box-sizing: border-box;
    }

    html {
      font-family: ${theme.typography.family.main};
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    body {
      font-size: ${theme.typography.size.main};
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;    
      background-color: ${theme.palette.secondary.darker};
    }

    a {
      color: ${theme.palette.secondary.main};
      background-color: transparent;
      text-decoration: none;
    }

    a:active,
    a:hover {
      text-decoration: underline;
      outline-width: 0;
    }

    abbr[title] {
      border-bottom: none;
      text-decoration: underline;
      text-decoration: underline dotted;
    }

    b,
    strong {
      font-weight: inherit;
      font-weight: bolder;
    }

    h1,h2,h3,h4,h5 {
      margin: 0;
      margin-bottom: 1em;
      color: ${theme.palette.white.main};
    }

    p {
      color: ${theme.palette.white.main};
    }

    h1 {
      font-size: ${theme.typography.size.h1};
    }

    h2 {
      font-size: ${theme.typography.size.h2};
      font-weight: normal;
    }

    h3 {
      font-size: ${theme.typography.size.h3};
      font-weight: normal;
    }

    h4 {
      font-size: ${theme.typography.size.h4};
      font-weight: normal;
    }

    small {
      font-size: ${theme.typography.size.small};
    }

    img {
      border-style: none;
    }

    svg:not(:root) {
      overflow: hidden;
    }

    hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      font: inherit;
      margin: 0;
    }

    button:focus,
    textarea:focus, 
    input:focus {
      outline: none;
    }

    optgroup {
      font-weight: 700;
    }


    [type="reset"],
    [type="submit"],
    button,
    html [type="button"] {
      -webkit-appearance: button;
    }
    

    @media only screen and (max-width: 480px) {
      html {
        font-size: 100%;
      }
    }
  `}
`;
 
export default GlobalStyle;