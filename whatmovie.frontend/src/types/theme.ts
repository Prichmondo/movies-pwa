export type MediaBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Palette = {
    primary: Color,
    secondary: Color,
    tertiary: Color,
    white: Color,
    gray: Color,
    black: Color,
    success: Color,
    warning: Color,
    error: Color
}

export type Color = {
    main: string;
    lighter: string;
    darker: string;
}

export type BreakPoints = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export type Grid = {
    columns: number;
}

export type Typography = {
    family: FontFamily;
    size: FontSize;
}

export type FontSize = {
    main: string;
    small: string;
    large: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    caption: string;
}

export type FontFamily = {
    main: string;
}

export type BorderRadius = {
    sm: string;
    md: string;
    lg: string;
}

export type Theme = {
    palette: Palette;
    gutter: number;
    breakPoints: BreakPoints;
    grid: Grid;
    typography: Typography;
    borderRadius: BorderRadius;
    formRadius: BorderRadius;
}

export type WithThemeProps = {
    theme: Theme
}
