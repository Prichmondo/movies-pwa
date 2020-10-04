import { useTheme } from "styled-components";
import { MediaBreakPoints, Theme } from "../types/theme";

export function GetBreakPoint(theme: Theme): MediaBreakPoints {
  if(window) {
    const width = window.innerWidth;
    
    if(width < theme.breakPoints.sm) {
      return 'xs';
    }

    if(width < theme.breakPoints.md) {
      return 'sm';
    }

    if(width < theme.breakPoints.lg) {
      return 'md';
    }

    if(width < theme.breakPoints.xl) {
      return 'lg';
    }

    return 'xl';

  }

  return 'xs';
  
}