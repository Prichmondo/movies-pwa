import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { TextSkeleton } from './textSkeleton';

type Props = {
  component?: React.ElementType<any> | keyof JSX.IntrinsicElements;
  ClassName?: string;
  rows: number
}

export const ParagraphSkeleton = ({ rows, ...rest }: Props) => {

  const mockRows: ReactNode[] = []

  for (let i = 0; i < rows; i++) {
    mockRows.push(<TextSkeleton />);
  }

  return (
    <ParagraphSkeletonStyle {...rest}>
      {mockRows}
    </ParagraphSkeletonStyle>
  );
}

const ParagraphSkeletonStyle = styled.div`
  ${TextSkeleton} {
    &:last-child {
      width: 50%;
    }
  }
`

