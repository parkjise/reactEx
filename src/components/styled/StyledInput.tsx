// src/components/styled/StyledInput.tsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { variables } from '../../styles/variables';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${variables.spacing.md};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InputContainer = styled.div<{ hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: border-color ${variables.transition.fast}, box-shadow ${variables.transition.fast};

  &:focus-within {
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ hasError }) => 
      hasError ? 'rgba(238, 93, 80, 0.15)' : 'rgba(49, 106, 255, 0.15)'};
  }
`;

const IconWrapper = styled.div`
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseInput = styled.input<{ hasIcon?: boolean }>`
  flex: 1;
  padding: 10px 12px;
  padding-left: ${({ hasIcon }) => (hasIcon ? '8px' : '12px')};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  outline: none;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
  margin-top: 4px;
`;

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ label, error, icon, fullWidth, className, ...props }, ref) => {
    return (
      <InputWrapper fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputContainer hasError={!!error}>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <BaseInput ref={ref} hasIcon={!!icon} {...props} />
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

StyledInput.displayName = 'StyledInput';
