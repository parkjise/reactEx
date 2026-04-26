import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: string;
}

const Wrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InputContainer = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  i {
    position: absolute;
    left: 12px;
    color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.textMuted)};
    font-size: 1.2rem;
  }
`;

const StyledInput = styled.input<{ $hasError: boolean; $hasIcon: boolean }>`
  width: 100%;
  padding: 12px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '12px')};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => ($hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`)};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.background};
      cursor: not-allowed;
      opacity: 0.7;
    `}
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
  margin-top: 2px;
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, icon, className, ...props }, ref) => {
    return (
      <Wrapper $fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputContainer $hasError={!!error}>
          {icon && <i className={icon}></i>}
          <StyledInput
            ref={ref}
            $hasError={!!error}
            $hasIcon={!!icon}
            {...props}
          />
        </InputContainer>
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

Input.displayName = 'Input';
