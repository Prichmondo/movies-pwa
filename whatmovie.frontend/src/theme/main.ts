import { Theme } from "../types/theme";

export const mainTheme: Theme = {
    palette: {
        primary:    { main: '#f70352', darker: '#990031', lighter: '#ff3173' },
        secondary:  { main: '#031d33', darker: '#000f1b', lighter: '#538ab7' },
        tertiary:   { main: '#0381f7', darker: '#0381f7', lighter: '#a2d1f8' },
        white:      { main: '#ffffff', darker: '#e0e0e0', lighter: '#ffffff' },
        gray:       { main: '#cccccc', darker: '#cccccc', lighter: '#cccccc' },
        black:      { main: '#000000', darker: '#000000', lighter: '#000000' },
        success:    { main: '#47be71', darker: '#2f7e4b', lighter: '#75eb9e' },
        warning:    { main: '#e7a440', darker: '#b46f09', lighter: '#fabf68' },
        error:      { main: '#f32f2f', darker: '#c21414', lighter: '#ff6262' }
    },
    gutter: 15,
    breakPoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    },
    grid: {
        columns: 12
    },
    typography: {
        family: { main: 'Source Sans Pro' },
        size: {
            main: "16px",
            small: "13px",
            large: "1.2em",
            h1: "3em",
            h2: "2em",
            h3: "1.5em",
            h4: "1.2em",
            caption: "0.6em"
        }
    },
    formRadius: {
      sm: '10px',
      md: '20px',
      lg: '40px'
    },
    borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px'
    }
}