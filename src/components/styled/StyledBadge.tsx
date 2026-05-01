// src/components/styled/StyledBadge.tsx
import React from 'react';
import styled, { css } from 'styled-components';

export type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'default';

interface StyledBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pill?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: rgba(49, 106, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
  `,
  success: css`
    background-color: rgba(5, 205, 153, 0.1);
    color: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background-color: rgba(238, 93, 80, 0.1);
    color: ${({ theme }) => theme.colors.error};
  `,
  warning: css`
    background-color: rgba(255, 181, 71, 0.1);
    color: #ffb547;
  `,
  default: css`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textMuted};
  `
};

const BadgeWrapper = styled.span<{ variant: BadgeVariant; pill?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: ${({ pill }) => (pill ? '999px' : '4px')};
  
  ${({ variant }) => variantStyles[variant]}
`;

export const StyledBadge: React.FC<StyledBadgeProps> = ({ children, variant = 'default', pill }) => {
  return (
    <BadgeWrapper variant={variant} pill={pill}>
      {children}
    </BadgeWrapper>
  );
};
