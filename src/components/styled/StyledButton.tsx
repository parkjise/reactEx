// src/components/styled/StyledButton.tsx
import React from 'react';
import styled, { css } from 'styled-components';
import { flexCenter } from '../../styles/mixins';
import { variables } from '../../styles/variables';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      background-color: rgba(49, 106, 255, 0.05);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: none;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background};
    }
  `
};

const sizeStyles = {
  small: css`
    padding: 6px 12px;
    font-size: 0.85rem;
    border-radius: 6px;
  `,
  medium: css`
    padding: 10px 16px;
    font-size: 0.95rem;
    border-radius: 8px;
  `,
  large: css`
    padding: 14px 24px;
    font-size: 1.05rem;
    border-radius: 10px;
  `
};

const ButtonBase = styled.button<StyledButtonProps>`
  ${flexCenter} // mixin 활용
  gap: 8px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all ${variables.transition.fast};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Props를 통한 스타일 분기 */
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ size = 'medium' }) => sizeStyles[size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StyledButton: React.FC<StyledButtonProps> = ({ 
  children, 
  icon, 
  isLoading, 
  ...props 
}) => {
  return (
    <ButtonBase disabled={isLoading} {...props}>
      {isLoading ? (
        <i className="ri-loader-4-line ri-spin"></i>
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      {children}
    </ButtonBase>
  );
};
