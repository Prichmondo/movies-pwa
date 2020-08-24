import { Theme } from "../types/theme";

export const mainTheme: Theme = {
    palette: {
        primary:    { main: '#f70352', darker: '#990031', lighter: '#ff3173' },
        secondary:  { main: '#31aaff', darker: '#125b8f', lighter: '#82cbfe' },
        tertiary:   { main: '#000000', darker: '#000000', lighter: '#000000' },
        white:      { main: '#ffffff', darker: '#ffffff', lighter: '#e0e0e0' },
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
        family: { main: 'sans-serif' },
        size: {
            main: "14px",
            small: "0.8em",
            large: "1.2em",
            h1: "3em",
            h2: "2em",
            h3: "1.5em",
            h4: "1.2em",
            caption: "0.6em"
        }
    },
    borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px'
    }
}