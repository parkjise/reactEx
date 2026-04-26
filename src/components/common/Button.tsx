import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: string;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: #ffffff;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryHover};
          border-color: ${({ theme }) => theme.colors.primaryHover};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.surface};
        color: ${({ theme }) => theme.colors.text};
        border: 1px solid ${({ theme }) => theme.colors.border};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.background};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary}10;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.textMuted};
        border: 1px solid transparent;
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.text};
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: 0.85rem;
      `;
    case 'medium':
      return css`
        padding: 10px 16px;
        font-size: 0.95rem;
      `;
    case 'large':
      return css`
        padding: 14px 20px;
        font-size: 1.05rem;
      `;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.button};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Variants & Sizes */
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  i {
    font-size: 1.2em;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        {...props}
      >
        {icon && <i className={icon}></i>}
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
