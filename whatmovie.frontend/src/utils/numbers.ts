import { useTheme } from "styled-components";
import { MediaBreakPoints, Theme } from "../types/theme";

export function formatNumber(value: string | number, fractionDigits: number = 0): string {
  
  if(typeof value === 'string') {
    value = parseFloat(value);
  }

  if(typeof value !== 'number') {
    return (0).toFixed(fractionDigits);
  }

  return value.toFixed(fractionDigits);
}