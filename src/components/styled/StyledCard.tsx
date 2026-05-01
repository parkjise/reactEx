// src/components/styled/StyledCard.tsx
import React from 'react';
import styled from 'styled-components';
import { variables } from '../../styles/variables';

interface StyledCardProps {
  children: React.ReactNode;
  padding?: string;
  noShadow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CardWrapper = styled.div<{ padding?: string; noShadow?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: ${({ padding }) => padding || variables.spacing.lg};
  box-shadow: ${({ noShadow }) => (noShadow ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.05)')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: box-shadow ${variables.transition.normal};

  &:hover {
    box-shadow: ${({ noShadow }) => (noShadow ? 'none' : '0 8px 24px rgba(0, 0, 0, 0.08)')};
  }
`;

export const StyledCard: React.FC<StyledCardProps> = ({ children, padding, noShadow, className, style }) => {
  return (
    <CardWrapper padding={padding} noShadow={noShadow} className={className} style={style}>
      {children}
    </CardWrapper>
  );
};
