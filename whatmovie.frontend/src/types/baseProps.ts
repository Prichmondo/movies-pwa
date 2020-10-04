export type BaseProps = {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType<any> | keyof JSX.IntrinsicElements;
}